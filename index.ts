import { ProductRepository } from "./src/repository/product-repository";
import { Checkout } from "./src/service/checkout";
import { PricingRule } from "./src/service/pricing-rule";
import { convertProductsJsonToProduct, convertProductOfferJsonToProductOffers } from "./src/utils";

const offer = [
    { sku: "atv", minimumQuantity: 3, freeQuantity: 1 },
    { sku: "ipd", minimumQuantity: 5, bulkPrice: 499.99 }
]

const productsJson = [
    {sku: "ipd", name: "Ipad", price: 549.99},
    {sku: "mbp", name: "MacBook Pro", price: 1399.99},
    {sku: "atv", name: "Apple TV", price: 109.50},
    {sku: "vga", name: "VGA adapter", price: 30.00}
];

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
