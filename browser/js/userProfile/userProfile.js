/**
 * Created by Jon on 1/15/16.
 */
app.config($stateProvider => {
    $stateProvider.state('userProfile', {
        url: '/profile',
        templateUrl: 'js/userProfile/userProfile.html',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser().then(user => user);
            }
        },
        controller: 'ProfileCtrl'
    });
});

app.controller('ProfileCtrl', ($scope, UserFactory, AddressFactory, $state, user) => {

    $scope.user = user;
    $scope.showShipping = false;
    $scope.error = null;

    if (!user) {
        $state.go('home');
    }

    UserFactory.getReviewsForUser(user._id)
        .then(reviewsArr => {
            $scope.reviews = reviewsArr;
        });

    UserFactory.getProductsForUser(user._id)
        .then(productsArr => {
            $scope.products = productsArr;
        })
        .then(null, (err) => { $scope.error = err});

    UserFactory.getOrdersForUser(user._id)
        .then(ordersArr => {
            $scope.orders = ordersArr;
        })
        .then(null, (err) => { $scope.error = err});
});
