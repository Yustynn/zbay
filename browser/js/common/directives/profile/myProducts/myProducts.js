/**
 * Created by Jon on 1/15/16.
 */
app.directive('zbMyProducts', () => {
    return {
        restrict: 'E',
        scope: {
            products: '='
        },
        templateUrl: 'js/common/directives/profile/myProducts/myProducts.html',
        link: function(scope) {}
    };
});
