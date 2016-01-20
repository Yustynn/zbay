app.directive('completedPayment', function($state) {
  return {
    restrict : 'E',
    templateUrl : 'js/place-order/completedPayment.html',
    link : function (scope, elem){
      scope.goHome = function() {
       // $state.go("products");
      }
    }
  }
});
