import { ProductRepository } from "./src/repository/product-repository";
import { Checkout } from "./src/service/checkout";
import { PricingRule } from "./src/service/pricing-rule";
import { convertProductsJsonToProduct, convertProductOfferJsonToProductOffers } from "./src/utils";
import productsDetails from './products.json';
import offersDetail from './offer.json';

const offer = offersDetail;
const productsJson = productsDetails;

const productOffers = convertProductOfferJsonToProductOffers(offer);
const products = convertProductsJsonToProduct(productsJson);
const productRepository = new ProductRepository(products);

const pricingRule = new PricingRule(productOffers);

const co1 = new Checkout(pricingRule, productRepository);
co1.scan("atv");
co1.scan("atv");
co1.scan("atv");
co1.scan("vga");
console.log(co1.total());

const co2 = new Checkout(pricingRule, productRepository);
co2.scan("atv");
co2.scan("ipd");
co2.scan("ipd");
co2.scan("atv");
co2.scan("ipd");
co2.scan("ipd");
co2.scan("ipd");
console.log(co2.total());
