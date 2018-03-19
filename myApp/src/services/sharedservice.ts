import {ProductModel} from '../models/productmodel';
export class SharedService {

    productData = [];
    constructor() {
    }

    setProductData(data: any) {
        this.productData = data;
    }

    getProductData() {
        let prod = new ProductModel("", null, null, null, null, null);
        this.productData.push(prod);
        return this.productData;
    }
}