app.config(($stateProvider) => {
  $stateProvider.state('placeorder', {
    url : '/checkout/:products',
    controller : 'PlaceOrderController',
    templateUrl : 'js/place-order/place-order.html',
    resolve : {
      user : (AuthService) =>{
        return AuthService.getLoggedInUser();
      }
    }
  });
});
//
app.controller('PlaceOrderController', ($scope, $state, $stateParams, user, CartFactory, $modal, MandrillFactory, $timeout) => {
  // cart
  // user are available to cartFactory
  $scope.cartFactory = CartFactory;
  $scope.user = $scope.cartFactory.user;
  $scope.cart = $scope.cartFactory.cart;
  $scope.totalPrice = 0;

  $scope.cart.forEach(function(product) {
    $scope.totalPrice += parseFloat(product.price, 10);
  })

  $scope.goCart = function() {
    $state.go("products.user");
  }

  $scope.submitPayment = () => {
    //send email

      var modal = $modal.open({
          template : '<completed-payment></completed-payment>'
      });
      $timeout(() => {
          modal.close();
          $state.go('home');
      }, 2000)

    MandrillFactory.sendEmailConfirmation({user: $scope.user, cart : CartFactory.cart});
    CartFactory.cart = [];
  }


});
