import { Product } from '../entity/product';
import { ProductOffer } from '../entity/product-offer';
import { convertProductJsonToProduct, convertProductOfferJsonToProductOffers } from '../utils';
import { PricingRule } from './pricing-rule';
import pricingTestData from './test-data/pricing-test.json';

describe('PricingRule', () => {
    let productsOffers: ProductOffer[];
    let pricingRule: PricingRule;
    let atvProduct: Product, ipadProduct: Product, mbpProduct: Product, vgaProduct: Product;
    beforeEach(() => {
        // initialize products
        atvProduct = convertProductJsonToProduct(pricingTestData.products.atv);
        ipadProduct = convertProductJsonToProduct(pricingTestData.products.ipd);
        mbpProduct = convertProductJsonToProduct(pricingTestData.products.mbp);
        vgaProduct = convertProductJsonToProduct(pricingTestData.products.vga);

        productsOffers = convertProductOfferJsonToProductOffers(pricingTestData.offer);
        pricingRule = new PricingRule(productsOffers);
    });

    describe('applyPricing', () => {
        test('should not apply any offer when no offer is provided', () => {
            productsOffers = convertProductOfferJsonToProductOffers([]);
            pricingRule = new PricingRule(productsOffers);

            expect(pricingRule.applyPricing([
                ipadProduct, atvProduct, ipadProduct, atvProduct, ipadProduct, ipadProduct, ipadProduct, 
            ])).toEqual(2968.95);
        });

        test('should apply offer buy 2 get 1 free offer is provided when 3 atv is provided', () => {
            productsOffers = convertProductOfferJsonToProductOffers(pricingTestData.buyAtvTwoGetOneFreeOffer);
            pricingRule = new PricingRule(productsOffers);

            expect(pricingRule.applyPricing([atvProduct, atvProduct, atvProduct])).toEqual(219);
        });
    
        test('should apply bulk pay offer when 3 ipad is provided -> ', () => {
            productsOffers = convertProductOfferJsonToProductOffers(pricingTestData.buyBulkIpad);
            pricingRule = new PricingRule(productsOffers);

            expect(pricingRule.applyPricing([ipadProduct, ipadProduct, ipadProduct])).toEqual(1499.97);
        });

        test('should mutiple offers for two different products -> ', () => {
            productsOffers = convertProductOfferJsonToProductOffers(pricingTestData.offer);
            pricingRule = new PricingRule(productsOffers);

            expect(pricingRule.applyPricing([
                ipadProduct, atvProduct, ipadProduct, atvProduct, ipadProduct, ipadProduct, ipadProduct, 
            ])).toEqual(2718.95);
        });
    });
  });
  
  