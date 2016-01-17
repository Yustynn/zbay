app.config(function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      controller : 'HomeController',
      templateUrl: 'js/home/home.html',
      resolve : {
        products : (ProductFactory) => {
          return ProductFactory.getProduct().then( products => products);
        }
      }
    });
});

app.controller('HomeController', function ($scope, products) {
  $scope.products = products;
  console.log(products);
});
