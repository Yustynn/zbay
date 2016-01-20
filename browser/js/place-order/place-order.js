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
app.controller('PlaceOrderController', function($scope, $state, $stateParams, user, CartFactory, $modal, MandrillFactory, $timeout) {
  // cart
  // user are available to cartFactory
  $scope.cartFactory = CartFactory;
  $scope.user = $scope.cartFactory.user;
  $scope.cart = $scope.cartFactory.cart;
  console.log($scope.cartFactory);
  console.log(user);
  $scope.totalPrice = 0;
  $scope.cart.forEach(function(product) {
    console.log(typeof product.price);
    $scope.totalPrice += parseFloat(product.price, 10);
  })

  $scope.goCart = function() {
    $state.go("products.user");
  }

  $scope.submitPayment = function() {
    //console.log($scope.cardNumber);
    //console.log($scope.cardExpiry);
    //console.log($scope.cardCVC);
    //$scope.go("products")

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
