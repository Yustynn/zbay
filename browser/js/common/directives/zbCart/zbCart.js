app.directive('zbCart', ['CartFactory', (CartFactory, AuthService) => {
  return {
    restrict : 'E',
    scope : {
      user : "="
    },
    templateUrl : 'js/common/directives/zbCart/zbCart.html',
    link : (scope) => {
      scope.cartfactory = CartFactory;

    }
  }
}]);


