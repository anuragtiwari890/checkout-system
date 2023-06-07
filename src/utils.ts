import { Product } from "./entity/product";
import { OfferType, ProductOffer, bulkBuyOffer, buyAndGetFreeProduct } from "./entity/product-offer";

type productOfferJsonDTO = {
    sku: string, 
    minimumQuantity: number, 
    freeQuantity?: number, 
    bulkPrice?: number,
}

type productJsonDTO = {
    sku: string, name: string, price: number
}

export function convertProductsJsonToProduct(productsJson: productJsonDTO[]) {
    return productsJson.map(it => convertProductJsonToProduct(it));
}

export function convertProductJsonToProduct(productJson: productJsonDTO) {
    // TODO: error handling
    const {sku, name, price} = productJson
    return new Product(sku, name, price);
}

export function convertProductOfferJsonToProductOffers(productsOffers: productOfferJsonDTO[]): ProductOffer[] {
    return productsOffers.map(it => { 
        if (!it.freeQuantity && !it.bulkPrice) {
            throw new Error('each product offer should contain either freeQuantity or bulk bulkPrice detail');
        }
        if (!it.sku) {
            throw new Error('product offer should contain product sku id');
        }

        if (!it.minimumQuantity) {
            throw new Error('product offer should contain minimum quantity');
        }

        return new ProductOffer(
            it.sku, 
            it.freeQuantity
                ? OfferType.BUY_X_AND_GET_X_PRODUCT_FREE : OfferType.BULK_BUY_X_AT_DISCOUNTED_PRICE,
            it.minimumQuantity,
            it.freeQuantity 
                ? { freeQuantity: it.freeQuantity } as buyAndGetFreeProduct
                : { bulkPrice: it.bulkPrice } as bulkBuyOffer
        )
    });
}