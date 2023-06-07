# checkout-system

## Installation

```bash
$ npm install
```

## Setup
1. You can add the products in the `product.json`.
2. You can add the offers in the `offer.json`.
3. In `index.ts` you can call the checkoutSystem same as the example shared below - 
```bash
const co1 = new Checkout(pricingRule, productRepository);
co1.scan("atv");
co1.scan("atv");
co1.scan("atv");
co1.scan("vga");
console.log(co1.total());
```

## Running the app

```bash
$ npx tsc; node build/index.js
```

## Running the test cases 

```bash
$ npm test
```

## Restrictions
1. Only 2 types of offers are supported 
  a. buy x of product and get x products free.
  b. bulk discount.

2. If a product has multiple offers only one offer will be applied.

--------------------------------------- Thank You ---------------------------------------
