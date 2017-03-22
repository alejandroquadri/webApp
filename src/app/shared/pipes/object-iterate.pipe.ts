import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectIterate'
})
export class ObjectIteratePipe implements PipeTransform {
  transform(value: any, key?: boolean, field?: string): any {
      console.log(value, key, field);
      if (value) {
        const keyArr: any[] = Object.keys(value),
        dataArr = [];

        keyArr.forEach((item: any) => {
          if ( item[0] === '$') { return; }
          if (key) { value[item].$key = item; }
          dataArr.push(value[item]);
        });
        if (field) {
          dataArr.sort((a: Object, b: Object): number => {
            return a[field] > b[field] ? 1 : -1;
          });
        }

        console.log('returned array by pipe', dataArr);

        return dataArr;
      } else {
        return;
      }
    }
}
