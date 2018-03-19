export class ProductModel {

    constructor(
        public description: string,
        public quantity: number,
        public pricePerQty: number,
        public discount: number,
        public price: number,
        public tax: number
    ) {}
}