/**
 * Using this as site of products put in cart
 * This would apply to authenticated user
 * and unauthenticated user
 * - Victor
 */
app.config($stateProvider => {

    $stateProvider.state('products.user', {
        url: '/products/user/:name',
        templateUrl: 'js/userProducts/userProducts.html',
        controller: 'UserProductCtrl'
    });
});

app.controller('UserProductCtrl', $scope => {

});
