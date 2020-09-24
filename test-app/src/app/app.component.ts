import { Component }          from '@angular/core';
import { Router }             from '@angular/router';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menu: {
    url: string;
    title: string;
    description: string;
  }[] = [
    {title: 'Таблица рейтингов', url: 'any-rate-table', description: 'Краткое описание'},
    {title: 'Курс валют к рублю', url: 'currency-rate', description: 'Краткое описание'},

  ];

  constructor(
    private ngxXml2jsonService: NgxXml2jsonService,
    private router: Router
  ) {

    const testXml = `<note><to>User</to><from>Library</from><heading>Message</heading><body>Some XML to convert to JSON!</body></note>`;
    const parser = new DOMParser();
    const xml = parser.parseFromString(testXml, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    console.log(obj);

  }

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  navigateBy(url: string): Promise<boolean> {
    return this.router.navigate([url]);
  }
}
