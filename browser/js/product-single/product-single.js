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

app.controller('ProductSingleCtrl', ($scope, product, AUTH_EVENTS, AuthService, ReviewFactory) => {
  $scope.product = product;
  $scope.addReview = function(){
    var postObj = {};
    AuthService.getLoggedInUser().then(function(user){
        postObj.user = user._id;
        postObj.product = product._id;
        postObj.starRating = $scope.review.starRating;
        postObj.text = $scope.review.text;
        ReviewFactory.createReview(postObj);
    })
  };
});
