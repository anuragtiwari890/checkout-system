import { Product } from "../entity/product";
import { OfferType, ProductOffer, bulkBuyOffer, buyAndGetFreeProduct } from "../entity/product-offer";

export type productWithQuantity = {
    product: Product, quantity: number
}

export class PricingRule {
    constructor(
        private readonly productOffers: ProductOffer[]
    ) {}

    applyPricing(products: Product[]): number{
        let totalAmount = 0;
        const productQuantityMapping = this.getProductAndQuantityRelation(products);

        for (const productId in productQuantityMapping ) {
            const { product, quantity } = productQuantityMapping[productId];
            totalAmount += this.getTotalAmountForProduct(product, quantity);
        }
        return totalAmount
    }

    private getTotalAmountForProduct(product: Product, count: number): number {
        const offers = this.productOffers.filter(
            productOffer => productOffer.productId === product.sku
        );

        let productAmount = product.price * count;

        for (const offer of offers) {
            switch (offer.offerType) {
                case OfferType.BUY_X_AND_GET_X_PRODUCT_FREE: 
                    const amountAfterDiscount = this.chargeforBuyAndGetFree(
                        product.price,
                        count,
                        offer.minimumQuantity, 
                        (offer.offerDetails as buyAndGetFreeProduct).freeQuantity,
                    );

                    if (amountAfterDiscount < productAmount) {
                        productAmount = amountAfterDiscount;
                    }
                    break;
                case OfferType.BULK_BUY_X_AT_DISCOUNTED_PRICE:
                    const amountAfterBulkDiscount = this.bulkBuy(
                        product.price, 
                        count, 
                        offer.minimumQuantity,
                        (offer.offerDetails as bulkBuyOffer).bulkPrice,
                    );

                    if (amountAfterBulkDiscount < productAmount) {
                        productAmount =  amountAfterBulkDiscount;
                    }
                    break;
                default: 
                    console.log(`${offer.offerType} is not supported`);
            }
        }
        
        return productAmount;
    }

    private chargeforBuyAndGetFree(
        productCost: number,
        productQuantity: number,
        minQuantity: number, 
        freeQuantity: number, 
    ): number {
        const freeProductsCount = Math.floor(productQuantity / minQuantity) * freeQuantity;
        return (productQuantity - freeProductsCount) * productCost;
    } 

    private bulkBuy(
        productCost: number,
        productQuantity: number,
        minQuantity: number, 
        bulkPrice: number
    ): number {
        if (productQuantity >= minQuantity) {
            return productQuantity * bulkPrice;
        }
        return productQuantity * productCost;
    }

    private getProductAndQuantityRelation(products: Product[]) {
        return products.reduce((acc, product, i) => {
            if (!acc[product.sku]) {
                acc[product.sku] = { product, quantity: 1 }
            } else {
                acc[product.sku].quantity++;
            }
            return acc;
        }, {} as Record<string, {product: Product, quantity: number}>);
    }
}