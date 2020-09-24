import { HttpClient }                          from '@angular/common/http';
import { Injectable }                          from '@angular/core';
import { NgxXml2jsonService }         from 'ngx-xml2json';
import { Observable, of, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  delay,
  delayWhen,
  map, mergeMap,
  retry,
  retryWhen,
  switchMap, take,
  tap,
  timeout
} from 'rxjs/operators';
import { Currency }                                                                            from './currency-model';
import { CbrJsonToCurrency, CbrXmlToCurrency } from './mappers/cbr';

export interface CurrencyRateSourceItem {
  url: string;
  name: string;
  type: 'json' | 'xml';
  priority: number;
  mapperFn: (data) => Currency[]
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService {

  private _sources: CurrencyRateSourceItem[] = [];
  private _selectedSource: CurrencyRateSourceItem;

  constructor(
    private ngxXml2jsonService: NgxXml2jsonService,
    private readonly http: HttpClient
  ) {

    this.addSource({name: 'ЦБ РФ (xml)', url: 'https://www.cbr-xml-daily.ru/daily_utf8.xml', type: 'xml', priority: 0, mapperFn: CbrXmlToCurrency});
    this.addSource({
      name: 'ЦБ РФ (Json)',
      url: 'https://www.cbr-xml-daily.ru/daily_json.js',
      type: 'json',
      priority: 1,
      mapperFn: CbrJsonToCurrency
    });
    this.selectSource('ЦБ РФ (xml)');
  }

  addSource(source: CurrencyRateSourceItem) {
    this.sources.push(source);
  }

  selectNextSource() {
    const indexSelected: number = this.sources.findIndex(el => el.name === this.selectedSource.name);
    if(indexSelected  === this.sources.length - 1) {
      this.selectSource(this.sources[0].name);
    } else if ( this.sources.length > indexSelected + 1) {
      this.selectSource(this.sources[indexSelected + 1].name);
    }
  }

  selectSource(name: string): void {
    if (!this.sources.length) {
      return;
    }
    const sourceId = this.sources.findIndex(el => el.name === name);
    const source: CurrencyRateSourceItem = this.sources[sourceId];
    if (!source) {
      throw new Error(`Source for currency with name ${name} is not found`);
    }
    const sourceIsLast: boolean = sourceId === this.sources.length - 1;
    if (sourceIsLast) {
      this.sources.forEach(el => el.priority++);
    } else {
      this.sources.find(el => el.priority === 0).priority = source.priority;
    }
    source.priority = 0;
    this._selectedSource = source;
  }

  get sources(): CurrencyRateSourceItem[] {
    return this._sources;
  }

  get selectedSource(): CurrencyRateSourceItem {
    return this._selectedSource;
  }

  getRawData(): Observable<any> {
    switch (this.selectedSource.type) {
      case 'json':
        return this.getJson(this.selectedSource.url);
      case 'xml':
        return this.getXml(this.selectedSource.url);
    }
  }

  getCurrencyRates(): Observable<Currency[]> {
    return this.getRawData().pipe(
      catchError(e => {
        console.log(`Ошибка при получении данных по источнику - ${this.selectedSource.url}`, e);
        this.selectNextSource();
        return throwError(`Ошибка при получении данных по источнику              ${this.selectedSource.url}`);
      }),
      map(r => this.selectedSource.mapperFn(r)),
    );
  }

  private getJson(url: string): Observable<any> {
    return this.http.get(url);
  }

  private getXml(url: string): Observable<any> {
    return this.http.get(url, {responseType: 'text'})
      .pipe(map((res) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(res, 'text/xml');
        return this.ngxXml2jsonService.xmlToJson(xml);
      }));
  }
}
