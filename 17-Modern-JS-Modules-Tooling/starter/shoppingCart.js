//Exporting module
console.log(`Exporting module`);

const shippingCost = 10;
const cart = [];
export { cart };

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart.`);
};

const totalPrice = 237;
const totalQuantity = 23;
export { totalPrice, totalQuantity };

export default function (fileNumber) {
  console.log(`file ${fileNumber} cleaned`);
}
