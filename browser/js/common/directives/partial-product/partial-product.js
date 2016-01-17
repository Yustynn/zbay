/**
 * This is the same as the full product directive
 * The changes are mainly in styling and what data is shown
 * purpose is for showing a list of products, say from a search
 */
//.populate("product categories reviews user orderItems")
app.directive('partialProduct', (ReviewFactory) => {
  return {
    restrict : 'E',
    scope : {
      product :'='
    },
    templateUrl : 'js/common/directives/partial-product/partial-product.html',
    link : (scope) => {
      // useful if you decide to calculate the  average rating
      // check number of reviews

      ReviewFactory.getReviewByProduct(scope.product._id)
        .then( reviews => {
          console.log(scope.product);
          console.log(scope.product["_id"]);
          scope.reviews = reviews;
        })
    }
  }
});
