app.config( ($stateProvider) => {

  $stateProvider.state('products.all', {
    url: '',
    templateUrl: 'js/products/allProducts/allProducts.html',
    controller: 'AllProductsCtrl'
  });
});

app.controller('AllProductsCtrl', ($scope, $stateParams) => {
  //console.log("all products sub state");
});
