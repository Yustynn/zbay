app.directive('zbCartDelete', (CartFactory) => {
  return {
    restrict : 'E',
    scope : {
      product : '='
    },
    templateUrl : 'js/common/directives/zbCartDelete/zbCartDelete.html',
    link : (scope) => {
      scope.cartfactory = CartFactory;
    }
  }
});
