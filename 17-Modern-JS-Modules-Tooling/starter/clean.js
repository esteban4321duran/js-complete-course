const shoppingCart = [
  { product: 'bread', quantity: 6 },
  { product: 'pizza', quantity: 2 },
  { product: 'milk', quantity: 4 },
  { product: 'water', quantity: 10 },
];

const maxAllowedProducts = {
  lisbon: 5,
  others: 7,
};

const checkAllowedProducts = function (cart, allowedNumber, city) {
  if (!cart.length) return [];

  const allowed = allowedNumber?.[city] ?? allowedNumber.others;

  return cart.map(item => {
    const { product, quantity } = item;
    return {
      product: product,
      quantity: quantity > allowed ? allowed : quantity,
    };
  });
};
const checkedCart = checkAllowedProducts(
  shoppingCart,
  maxAllowedProducts,
  'lisbon'
);
console.table(checkedCart);

const createOrderDescription = function (cart) {
  const [{ product, quantity }] = cart;

  return `Order with ${quantity} ${product}${
    shoppingCart.length > 1 ? ', etc...' : '.'
  }`;
};
const orderDescription = createOrderDescription(checkedCart);

console.log(orderDescription);
