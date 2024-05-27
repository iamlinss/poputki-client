import {Pipe, PipeTransform} from '@angular/core';
import {format, parseISO} from 'date-fns';
import {ru} from 'date-fns/locale';

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    const date = parseISO(value);
    return format(date, 'EEE, d MMMM', {locale: ru});
  }
}
