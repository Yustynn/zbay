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

app.controller('ProductSingleCtrl', ($scope, product, AUTH_EVENTS, AuthService, ReviewFactory, UserFactory) => {
    $scope.product = product;
    $scope.addReview = function(){
        var postObj = {};
        AuthService.getLoggedInUser().then(function(user){
            postObj['user'] = user['_id'];
            postObj['product'] = product['_id'];
            console.log('starz ',$scope.review.starRating);
            if($scope.review.starRating > 5)
            {
                alert('too many damn stars u idiot');
                return;
            }
            else if($scope.review.starRating < 0)
            {
                alert('damn u must really hate this product but it gotta be at least 0');
                return;
            }
            else if($scope.review.starRating % 1 !== 0)
            {
                alert('gotta be an integer boss');
                return;
            }

            postObj['starRating'] = $scope.review.starRating;
            postObj['text'] = $scope.review.text;
            ReviewFactory.createReview(postObj)
                .then(function(obj){
                    // Sean why do you do this?
                    //console.log('objj ', obj);
                })

        })
    }
})
