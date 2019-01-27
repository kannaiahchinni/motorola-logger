import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kfilter'
})

@Injectable()
export class KfilterPipe implements PipeTransform {

  transform(items: any[], field: string , value: string): any[] {
    if (!value)  {
      return items;
    }
    return items.filter( item => item.toLowerCase().indexOf(value) > -1 );
  }

}
