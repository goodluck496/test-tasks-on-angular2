/**
 * Created by kaluginsa on 04.05.2017.
 */

import { Pipe, PipeTransform } from '@angular/core';
import * as numeral            from 'numeral';
import 'numeral/locales/ru'

/**
 * {{ 12415.3453123 | appNumeral }}
 * {{ 12415.3453123 | appNumeral:"0,0.00" }}
 *  Use NumeralJS
 */
@Pipe({name: 'appNumeral'})
export class NumeralPipe implements PipeTransform {
  transform(value: string | number, type?: string): any {
    if (value == null || !isFinite(<number>value)) {
      return value;
    }
    return numeral(value).format(type || '0,0.[000]');
  }
}
