export class Product {
  constructor(
      public name: string,
      public price: number,
      public img: string,
      // tslint:disable-next-line:variable-name
      public _quantity: number = 0,
  ) {}

  set quantity(val: any) { this._quantity = Math.max(0, parseInt(val) || 0); }
  get quantity() { return this._quantity; }
}
