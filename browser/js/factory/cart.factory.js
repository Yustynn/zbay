app.factory('CartFactory', () => {
  let factory = {};

  factory.cart = [];
  factory.cartNumber = () => {
    return factory.cart.length;
  }

  factory.addToCart = (product) => {
    factory.cart.push(product);
  }

  factory.removeFromCart = (product) => {
    let cartIndex = -1;
    factory.cart.forEach(function(storedProduct, index) {
      if (storedProduct.title === product.title) {
        cartIndex = index;
      }
    });
    if (cartIndex !== -1){
      factory.cart.splice(cartIndex, 1);
    }

  }

  return factory;
});
