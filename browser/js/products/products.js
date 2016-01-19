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

app.controller('ProductsController', function ($scope, $element, products, categories, CartFactory) {
  $scope.products = products;
  $scope.categories = categories;
  $scope.productRemove = true;

  $scope.removeProduct = (product) => {
    console.log("this is to remove the item from cart")
    CartFactory.removeFromCart(product);
    $scope.productRemove = true;
    $scope.$apply()
  }

  $scope.isRemoved = () => {return $scope.productRemove;};


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
