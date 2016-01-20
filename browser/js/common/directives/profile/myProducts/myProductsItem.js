/**
 * Created by Jon on 1/17/16.
 */
app.directive('zbMyProductsItem', function() {
    return {
        restrict: 'E',
        scope: {
            product: '='
        },
        template: '<a ui-sref="marketplace" ">Product Name: {{product.title}}</a> {{ product.description}}',
        link: function () {
        }
    };
});
