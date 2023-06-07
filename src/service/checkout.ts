import { Product } from "../entity/product";
import { ProductRepository } from "../repository/product-repository";
import { PricingRule } from "./pricing-rule";

export class Checkout {
    private products: Product[] = [];

    constructor(
        private readonly pricingRule: PricingRule,
        private readonly productRepository: ProductRepository,
    ) {}

    scan(productId: string) {
        const product = this.productRepository.findById(productId);
        this.products.push(product);
    }
    
    total(): number {
        return this.pricingRule.applyPricing(this.products);
    }
}