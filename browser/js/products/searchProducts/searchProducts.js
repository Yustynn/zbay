app.config( ($stateProvider) => {

  $stateProvider.state('products.search', {
    url: '/search/:search/:category',
    templateUrl: 'js/products/searchProducts/searchProducts.html',
    controller: 'SearchProductsCtrl'
  });
});

/**
 * have not connected the category selection into the search
 * will do later
 */
app.controller('SearchProductsCtrl', ($scope, $stateParams) => {
  console.log($stateParams.search);
  $scope.products = $scope.products.filter(function (product) {
    return product.title.toLowerCase().includes($stateParams.search.toLowerCase());
  });
});
