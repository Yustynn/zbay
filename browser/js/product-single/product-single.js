app.config($stateProvider => {
  $stateProvider.state('productSingle', {
    url: '/product-single/:id',
    templateUrl: '/js/product-single/product-single.html',
    resolve: {
      product: function($stateParams, ProductFactory) {
        return ProductFactory.getProduct($stateParams.id);
      }
    },
    controller: 'ProductSingleCtrl'
  })
});

app.controller('ProductSingleCtrl', ($scope, product) => {
  $scope.product = product;
  console.log(product);
});
