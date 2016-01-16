app.config($stateProvider => {

    $stateProvider.state('products.user', {
        url: '/products/user/:name',
        templateUrl: 'js/userProducts/userProducts.html',
        controller: 'UserProductCtrl'
    });
});

app.controller('UserProductCtrl', $scope => {

});
