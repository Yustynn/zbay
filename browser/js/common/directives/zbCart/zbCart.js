app.directive('zbCart', ['CartFactory', (CartFactory) => {
  return {
    restrict : 'E',
    scope : {

    },
    templateUrl : 'js/common/directives/zbCart/zbCart.html',
    link : (scope) => {
      scope.cartfactory = CartFactory;
    }
  }
}]);


