import { Component, OnDestroy, OnInit }                                     from '@angular/core';
import { FormBuilder, FormControl, FormGroup }                              from '@angular/forms';
import { MatDialog }                                                        from '@angular/material/dialog';
import { MatSnackBar }                                                      from '@angular/material/snack-bar';
import { BehaviorSubject, interval, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, map, take, takeUntil, tap }                            from 'rxjs/operators';
import { Currency }                                                         from '../../modules/currency-rate/currency-model';
import { CurrencyRateService, CurrencyRateSourceItem }                      from '../../modules/currency-rate/currency-rate.service';
import { DeepListItem }                                                     from '../../share/components/deep-list/deep-list.component';

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.scss']
})
export class CurrencyRatePageComponent implements OnInit, OnDestroy {

  workItems: DeepListItem = {
    name: '',
    children: [
      {
        name: 'Источники для получения курса', children: [
          {name: 'https://www.cbr-xml-daily.ru/daily_utf8.xml', children: []},
          {name: 'https://www.cbr-xml-daily.ru/daily_json.js', children: []},
        ]
      },
      {name: 'Должен быть задан порядок опроса источников.', children: []},
      {
        name: 'В случае, если источник недоступен, необходимо переключиться на прием данных с другого источника.',
        children: []
      },
      {
        name: 'Добавление нового источника с другой структурой ответа должно быть простым, без необходимости переписывать большую часть кода.',
        children: []
      },
      {name: 'Важно продемонстрировать понимание принципов ООП и SOLID.', children: []},
    ]
  };


  //////////////////
  valuteCodeList: string[];
  valuteGroup: FormGroup = this.fb.group({
    charCode: 'EUR',
    name: 'Евро'
  });
  currency: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>([]);
  destroy: Subject<void> = new Subject<void>();
  isLoading: Subject<boolean> = new Subject<boolean>();
  intervalUpdateSub: Subscription;

  updateProgress: number = 0;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private currencyRateService: CurrencyRateService
  ) {
  }

  get currencyDate(): Observable<Date> {
    return this.currency.pipe(map(e => e.length && e[0].date || new Date))
  }

  get currentSource(): CurrencyRateSourceItem {
    return this.currencyRateService.selectedSource;
  }

  ngOnInit(): void {
    this.loadCurrencyRate();
    this.intervalUpdate();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  intervalUpdate() {
    this.updateProgress = 0;
    this.intervalUpdateSub = interval(1000)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.updateProgress += 10;
        if(this.updateProgress >= 100) {
          this.updateProgress = 0;
          this.loadCurrencyRate();
        }
      });
  }

  async loadCurrencyRate() {
    this.isLoading.next(true);
    this.currencyRateService.getCurrencyRates()
      .pipe(
        tap(() => this.isLoading.next(false)),
        catchError(e => {
          this.intervalUpdateSub.unsubscribe();
          this.snackBar.open(e, '', {duration: 5000}).afterDismissed()
            .pipe(take(1))
            .subscribe(r => {
              this.intervalUpdate();
              this.isLoading.next(false);
            });
          return of([]);
        })
      )
      .subscribe(d => {
        this.currency.next([...d]);
      });
  }

  currencyIsSelect(value: Currency): boolean {
    return this.valuteGroup.get('charCode').value === value.charCode;
  }

  nextSource() {
    this.currencyRateService.selectNextSource();
    this.loadCurrencyRate();
  }


}
