import { Product } from "../entity/product";

export class ProductRepository {
    constructor (
        private products: Product[]
    ) {}

    findById(productId: string): Product {
        return this.products.filter(it => it.sku === productId)[0]
    }
}