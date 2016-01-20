app.directive('zbCart', ['CartFactory', 'OrderFactory', 'OrderItemFactory', 'ProductFactory', 'CategoryFactory','AUTH_EVENTS',
    'AuthService', (CartFactory, OrderFactory, OrderItemFactory, ProductFactory, CategoryFactory, AUTH_EVENTS, AuthService) => {
  return {
    restrict : 'E',
    scope : {
      user : "="
    },
    templateUrl : 'js/common/directives/zbCart/zbCart.html',
    link : (scope) => {

      // This was pre- modification of the populate ability into the origin crudhelper
      // so many bad requests
      scope.cartfactory = CartFactory;
      CategoryFactory.getCategory().then(categories => {
        //each has name and _id
        scope.categories = categories;
      });
      // when you know the product and the quantity
      // one big function :(
      scope.updateCart = () => {
        AuthService.getLoggedInUser()
          .then(function (user) {
            scope.user = user;
            return scope.user;
          })
          .then(function (user) {
            const orders = user["orders"];
            let orderPromises = [];
            if (orders) {
              orders.forEach(function (order) {
                orderPromises.push(OrderFactory.getOrder(order));
              })
            }
            return Promise.all(orderPromises);
          })
          .then(function (orders) {
            // for every order, get the order items
            // check that the order.status is 'inCart'
            let cartItems = [];
            let cartOrders = orders.filter(function (order) {
              return order.status === 'inCart';
            });
            // technically, should only be one
            let orderItemsPromise = [];
            if (cartOrders) {
              cartOrders[0].orderItems.forEach(function (order) {
                orderItemsPromise.push(OrderItemFactory.getOrderItem(order));
              });
            }
            return Promise.all(orderItemsPromise);
          })
          .then(function (orderItems) {
            // for every order items, get the product
            let productPromises = [];
            orderItems.forEach(function (orderItem) {
              for (let i = 0; i < orderItem.quantity; i++) {
                productPromises.push(ProductFactory.getProduct(orderItem.product));
              }
            });
            return Promise.all(productPromises);
          })
          .then(function (products) {
            console.log("products : ", products);
            //all the products to be in the cart;
            products = products.map(function(product) {
              product.categories = product.categories.map(function(category) {
                let categoryName;
                scope.categories.forEach(function(generalCategory) {
                  if (generalCategory._id === category) {
                    categoryName = generalCategory.name;
                  }
                });
                return categoryName;
              });
              return product;
            })
            scope.cartfactory.cart = JSON.parse(localStorage["cart"]) || products;
            localStorage.removeItem('cart');
            localStorage.setItem("cart", JSON.stringify(scope.cartfactory.cart));
          })
      }


      scope.updateCart();
    }
  }
}]);


