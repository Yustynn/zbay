app.directive('zbCartAdd', (CartFactory) => {
  return {
    restrict : 'E',
    scope : {
      product : '='
    },
    templateUrl : 'js/common/directives/zbCartAdd/zbCartAdd.html',
    link : (scope) => {
      scope.cartfactory = CartFactory;
    }
  }
});
