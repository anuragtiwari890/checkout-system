import { Product } from "./product";

export enum OfferType {
    BUY_X_AND_GET_X_PRODUCT_FREE = 'BUY_X_AND_GET_X_PRODUCT_FREE',
    BULK_BUY_X_AT_DISCOUNTED_PRICE = 'BULK_BUY_X_AT_DISCOUNTED_PRICE',
}

export type buyAndGetFreeProduct = {
    freeQuantity: number
}

export type bulkBuyOffer = {
    bulkPrice: number,
}

export class ProductOffer {
    constructor(
        readonly productId: string,
        readonly offerType: OfferType,
        readonly minimumQuantity: number,
        readonly offerDetails: buyAndGetFreeProduct | bulkBuyOffer
    ) { 
        this.validateOfferDtails();
    }

    validateOfferDtails() {
        if (!this.productId) {
            throw new Error('Please provide the product id');
        }
        
        if (!this.minimumQuantity || this.minimumQuantity <= 0 ) {
            throw new Error('Please provided the minimum quantity');
        }
        
        switch(this.offerType) {
            case OfferType.BUY_X_AND_GET_X_PRODUCT_FREE: 
                if (!(this.offerDetails as buyAndGetFreeProduct).freeQuantity) {
                    throw new Error('Please provide the freeQuntity in offer details');
                }
                break;
            case OfferType.BULK_BUY_X_AT_DISCOUNTED_PRICE: 
                if (!(this.offerDetails as bulkBuyOffer).bulkPrice) {
                    throw new Error('Please provide the bulkPrice in offer details');
                }
                break;
            default: 
                throw new Error('Invalid offer type provided');
        }
    }
}