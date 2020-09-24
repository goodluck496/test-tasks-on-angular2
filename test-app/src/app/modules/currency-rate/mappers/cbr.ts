import * as moment  from 'moment';
import { Currency } from '../currency-model';

interface ICbrXmlResponse {
  ValCurs: {
    '@attributes': {
      Date: string;
      name: string;
    },
    Valute: {
      '@attributes': { ID: string; },
      CharCode: string;
      Name: string;
      Nominal: string;
      NumCode: string;
      Value: string;
    }[]
  }
}

interface ICbrJsonResponse {
  Date: string; //"2020-09-23T11:30:00+03:00",
  PreviousDate: string; //"2020-09-22T11:30:00+03:00",
  PreviousURL: string;
  Timestamp: string; //"2020-09-22T11:30:00+03:00",
  Valute: {
    [charCode: string]: {
      ID: string;
      NumCode: string;
      CharCode: string;
      Nominal: number;
      Name: string;
      Value: number;
      Previous: number;
    }
  }
}

export function CbrXmlToCurrency(data: ICbrXmlResponse): Currency[] {
  if(!data || !data.ValCurs || !data.ValCurs.Valute) {
    return [];
  }
  return data.ValCurs.Valute.map(el => {

    const parsedValue: number = +el.Value.replace(',', '.');
    const value: number = Number.isFinite(parsedValue) ? parsedValue / +el.Nominal : 0;
    return {
      id: el['@attributes'].ID,
      charCode: el.CharCode,
      numCode: el.NumCode,
      date: moment(data.ValCurs['@attributes'].Date, 'DD.MM.YYYY').toDate(),
      name: el.Name,
      valueBy: value,
      valueSell: value
    };
  })
}

export function CbrJsonToCurrency(data: ICbrJsonResponse): Currency[] {

  if(!data || !data.Valute) {
    return [];
  }
  return Object.keys(data.Valute)
    .map(charCode => {
      const valute = data.Valute[charCode];
      const value: number = Number.isFinite(valute.Value) ? valute.Value / +valute.Nominal : 0;
      return {
        id: valute.ID,
        charCode,
        numCode: valute.NumCode,
        date: moment(data.Date).toDate(),
        name: valute.Name,
        valueSell: value,
        valueBy: value
      }
    });
}
