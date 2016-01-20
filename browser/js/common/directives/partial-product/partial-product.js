/**
 * This is the same as the full product directive
 * The changes are mainly in styling and what data is shown
 * purpose is for showing a list of products, say from a search
 */
//.populate("product categories reviews user orderItems")
app.directive('partialProduct', (ReviewFactory,CartFactory, $state, AuthService) => {
  return {
    restrict : 'E',
    scope : {
      product :'='
    },
    templateUrl : 'js/common/directives/partial-product/partial-product.html',
    link : (scope, elem) => {
      // useful if you decide to calculate the  average rating
      // check number of reviews

      // need to know the user
      // Cart updates on the front end
      // need to reflect on the backend on add and remove

      AuthService.getLoggedInUser().then(function(user) {
        scope.user = user;
        console.log(scope.user);
      });


      scope.isCartState = () => {
        return $state.is("products.user");
      };

      scope.removeFromCart = (product) => {
        CartFactory.removeFromCart(product);
        elem.remove();
      };

      //ReviewFactory.getReviewByProduct(scope.product._id)
      //  .then( reviews => {
      //    console.log(scope.product);
      //    console.log(scope.product["_id"]);
      //    scope.reviews = reviews;
      //  })
    }
  }
});
