app.config( ($stateProvider) => {

  $stateProvider.state('products.search', {
    url: '/search/:search/:category',
    templateUrl: 'js/products/searchProducts/searchProducts.html',
    controller: 'SearchProductsCtrl'
  });
});

app.controller('SearchProductsCtrl', ($scope, $stateParams) => {
  $scope.products = $scope.products.filter(function (product) {
    return product.title.toLowerCase().includes($stateParams.search.toLowerCase());
  }).filter( function(product) {
    if ($stateParams.category === '') {
      return true;
    } else {
      if (product.categories.indexOf($stateParams.category)){
        return true;
      }
      return false;
    }
  })

});
