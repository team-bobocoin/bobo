import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(value: number, casasDecimais = 2) {
    return (value / Math.pow(10, casasDecimais)).toFixed(casasDecimais).replace('.', ',')
  }
}
