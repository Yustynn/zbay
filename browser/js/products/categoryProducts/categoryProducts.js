/**
 * Created by Jon on 1/15/16.
 */
app.config( ($stateProvider) => {

    $stateProvider.state('products.category', {
        url: '/category/:category',
        templateUrl: 'js/products/categoryProducts/categoryProducts.html',
        controller: 'CategoryProductsCtrl'
    });
});

app.controller('CategoryProductsCtrl', ($scope, $stateParams) => {

  $scope.products = $scope.products.filter(function (product) {
    return product.categories.indexOf($stateParams.category) !== -1;
  });
});
