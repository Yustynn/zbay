/**
 * Clean up as lower priority as of Jan 17
 * if user is authenticated, should reflect server cart instead
 */
app.factory('CartFactory', (AuthService, UserFactory, OrderFactory) => {



  let factory = {};

  AuthService.getLoggedInUser()
    .then(function(user) {
      console.log("in cart factory, :" + user);
      factory.user = user;
    });

  if (!window.localStorage.getItem("cart")){
    localStorage.removeItem('cart');
    window.localStorage.setItem('cart', JSON.stringify([]));
  }

  factory.cart = JSON.parse(localStorage.getItem("cart")) || [];

  factory.cartNumber = () => {
    return factory.cart.length;
  }

  // when retrieving from local storage, JSON.parse(factory.cart)
  factory.addToCart = (product) => {
    factory.cart.push(product);
    localStorage.removeItem('cart');
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
      console.log(factory.user);
      factory.cart.splice(cartIndex, 1);
      const storageCart = JSON.parse(localStorage.getItem("cart"));
      storageCart.splice(cartIndex,1);
      localStorage.removeItem('cart');
      localStorage.setItem("cart", JSON.stringify(storageCart));
      UserFactory.getUser(factory.user._id)
        .then(function(user) {
          // match each of the user
          console.log("in the promises ", user);
        })
    }


  }

  return factory;
});
