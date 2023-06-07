import { OfferType, ProductOffer, bulkBuyOffer, buyAndGetFreeProduct } from './product-offer';

describe('ProductOffer', () => {
        test('should be able to create bulk offer with valid detils', () => {
            expect(new ProductOffer(
                "1234", 
                OfferType.BULK_BUY_X_AT_DISCOUNTED_PRICE,
                4,
                { bulkPrice: 500 } as bulkBuyOffer 
            )).toBeTruthy();
        });

        test('should be able to create buy x and get x Product free offer with valid detils', () => {
            expect(new ProductOffer(
                '1234', 
                OfferType.BUY_X_AND_GET_X_PRODUCT_FREE,
                4,
                { freeQuantity: 1 } as buyAndGetFreeProduct 
            )).toBeTruthy();
        });

        test('should throw error when product id is not provided', () => {
                expect(() => new ProductOffer(
                    '', 
                    OfferType.BUY_X_AND_GET_X_PRODUCT_FREE,
                    4,
                    { freeQuantity: 1 } as buyAndGetFreeProduct 
                )).toThrow(new Error('Please provide the product id'));
        });

        test('should throw error when minimum quatity is invalid', () => {
            expect(() => new ProductOffer(
                '1234', 
                OfferType.BUY_X_AND_GET_X_PRODUCT_FREE,
                null as any,
                { freeQuantity: 1 } as buyAndGetFreeProduct 
            )).toThrow(new Error('Please provided the minimum quantity'));
        });

        test('should throw error when offer type is buy and get free but free quantity is not provided', () => {
            expect(() => new ProductOffer(
                '1234', 
                OfferType.BUY_X_AND_GET_X_PRODUCT_FREE,
                4,
                { bulkd: 1 } as any
            )).toThrow(new Error('Please provide the freeQuntity in offer details'));
        });

        test('should throw error when offer type is bulk order but bulk price is not provided', () => {
            expect(() => new ProductOffer(
                '1234', 
                OfferType.BULK_BUY_X_AT_DISCOUNTED_PRICE,
                4,
                { temp: 1 } as any
            )).toThrow(new Error('Please provide the bulkPrice in offer details'));
        });

        test('should throw error when invalid offer type is provided', () => {
            expect(() => new ProductOffer(
                '1234', 
                'invalid_offer_type' as any,
                4,
                { freeQuantity: 1 } as buyAndGetFreeProduct
            )).toThrow(new Error('Invalid offer type provided'));
        });
  });
  
  