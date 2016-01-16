/**
 * Created by Jon on 1/15/16.
 */
app.config($stateProvider => {

    $stateProvider.state('singleProduct', {
        url: '/products/:name',
        templateUrl: 'js/categoryProducts/categoryProducts.html',
        controller: 'SingleProductCtrl'
    });
});

app.controller('SingleProduct', ($scope, $stateParams) => {

});
