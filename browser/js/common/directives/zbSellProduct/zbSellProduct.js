/**
 * Created by Jon on 1/19/16.
 */
app.directive('zbSellProduct', () => {
    return {
        restrict: 'E',
        scope: {
            product: '='
        },
        templateUrl: 'js/common/directives/zbSellProduct/zbSellProduct.html'
    };


});
