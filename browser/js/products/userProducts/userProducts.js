/**
 * Using this as site of products put in cart
 * This would apply to authenticated user
 * and unauthenticated user
 *  If authenticated user, grab from server
 *  else use localStorage
 *  - Victor
 */
app.config($stateProvider => {

    $stateProvider.state('products.user', {
      url: '/products/user/:name',
      templateUrl: 'js/products/userProducts/userProducts.html',
      controller: 'UserProductCtrl',
      resolve : {

        // we don't have a backend cart yet
        // have a way to add to a user cart on server
        //userProducts : (UserFactory, $stateParams) => {
        //  return UserFactory.getUser($stateParams.name)
        //    .then(function (user) {
        //      return user.cart
        //    })
        //}
      }
    });
});

app.controller('UserProductCtrl', ($scope,  $stateParams) => {
  // have access to $scope.categories from the products state
  // there is an issue where if I create the cart from new adds, the
  // category is not translated to the string tag and not the id
  // or more accurately, I would set the localStorage to be what is on the server
  // while backend cart does not exist the window localStorage will be current implementation
  $scope.products = JSON.parse(window.localStorage.getItem("cart"));
});
