import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'appMoment'
})
export class MomentPipe implements PipeTransform {
  transform(value: string | Date, type: string): any {
    const m = moment(value);
    if (m.isValid()) {
      return m.format(type || 'L');
    }
    return value;
  }
}
