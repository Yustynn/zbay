app.directive('zbCart', ['CartFactory', 'OrderFactory', 'OrderItemFactory', 'AuthService', (CartFactory, OrderFactory, OrderItemFactory, AuthService) => {
  return {
    restrict : 'E',
    scope : {
      user : "="
    },
    templateUrl : 'js/common/directives/zbCart/zbCart.html',
    link : (scope) => {
      scope.cartfactory = CartFactory;
      const userCartProducts = [];

      AuthService.getLoggedInUser().then(function (user) {
        scope.user = user;
        console.log(scope.user);
        return scope.user;
      }).then( function (user) {
        // find the inCart status orders
        const orders = user.orders;
        let orderItems;
        //// if array is unempty, get the orders but
        //// check for the items that is empty;
        /**
        let orderPromise = [];
        if (!orders) {
          orders.forEach(function (order) {
            orderPromise.push(OrderFactory.getOrder(order));
          })

          Promise.all(orderPromise).then(function(orders) {
            orders.forEach(function(order) {
              if (order.status === 'inCart') {
                 return orderItems = order.orderItems;
              }
            });
          })
          .then(function (orderItems) {
            // order if made of order and quantity
            let orderItemsPromise = [];
            orderItems.forEach( function (orderItem) {
              orderItemsPromise.push(OrderItemFactory.getOrderItem(orderItem));
            });
            return Promise.all(orderItemsPromise);
          })
          .then( function (orderItems) {
            // Product get
            // don't consider the quantity at the moment
          })
        }
        */
      });
    }
  }
}]);


