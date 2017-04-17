import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(array: any[], field: string, term: string) {
      if (array) {
        if (term === '') {
          return array;
        } else {
          return array.filter( item => {
            return item[field] === term;
          });
        }
      }
    }
}
