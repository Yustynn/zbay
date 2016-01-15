/**
 * Created by Jon on 1/15/16.
 */
app.config($stateProvider => {

    $stateProvider.state('products.category', {
        url: '/products/category/:category',
        templateUrl: 'js/categoryProducts/categoryProducts.html',
        controller: 'CategoryProductsCtrl'
    });
});

app.controller('CategoryProducts', ($scope, $stateParams) => {

});
