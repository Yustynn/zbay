/**
 * Created by Jon on 1/15/16.
 */
app.config(function ($stateProvider) {
    $stateProvider.state('products', {
      // never go to this state, always to its child substates
      abstract : true,
      url: '/products',
      templateUrl: 'js/products/products.html',
      resolve : {
        products : (ProductFactory) => {
          return ProductFactory.getProduct().then( products => products );
        },
        categories : (CategoryFactory) => {
          return CategoryFactory.getCategory().then( categories => categories );
        }

      },
      controller : 'ProductsController'
    });
});

app.controller('ProductsController', function ($scope, products, categories) {
  $scope.products = products;
  $scope.categories = categories;

  // assigning product categories with category names
  // not doing a populate because of the way our backend is set up
  // wish there was default populate all configuration
  $scope.products.forEach( function (product) {
    product.categories = product.categories.map( function (categoryId) {
      let categoryName;
      $scope.categories.forEach( function (category) {
        let { _id, name } = category;
        if (categoryId === _id) {
          categoryName = name;
        }
      })
      return categoryName;
    });
  });

})
