/**
 * Created by Jon on 1/17/16.
 */
app.directive('zbMyProductsItem', function() {
    return {
        restrict: 'E',
        scope: {
            product: '='
        },
        template: '<a ng-href="/products/{{product._id}}">Link To product page?</a>{{product}}',
        link: function () {
        }
    };
});
