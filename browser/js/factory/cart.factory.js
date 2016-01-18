/**
 * Clean up as lower priority as of Jan 17
 * if user is authenticated, should reflect server cart instead
 */
app.factory('CartFactory', () => {
  let factory = {};
  if (!window.localStorage.getItem("cart")){
    window.localStorage.setItem('cart', JSON.stringify([]));
  }

  factory.cart = JSON.parse(localStorage.getItem("cart")) || [];

  factory.cartNumber = () => {
    return factory.cart.length;
  }

  // when retrieving from local storage, JSON.parse(factory.cart)
  factory.addToCart = (product) => {
    factory.cart.push(product);
    localStorage.setItem("cart", JSON.stringify(factory.cart));
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
      const storageCart = JSON.parse(localStorage.getItem("cart"));
      storageCart.splice(cartIndex,1);
      localStorage.setItem("cart", JSON.stringify(storageCart));
    }


  }

  return factory;
});
