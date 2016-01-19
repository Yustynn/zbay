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
        console.log("No user Found");
        $state.go('home');
    }

    AddressFactory.getAddress(user.address[0]._id)
        .then(address => {
            user.address = address;
            console.log("address",address);
        })

    UserFactory.getReviewsForUser(user._id)
        .then(reviewsArr => {
            $scope.reviews = reviewsArr;
        })
        .then(null, (err) => { $scope.error  = err});

    UserFactory.getProductsForUser(user._id)
        .then(productsArr => {
            //console.log("Products", productsArr);
            $scope.products = productsArr;
        })
        .then(null, (err) => { $scope.error = err});

    UserFactory.getOrdersForUser(user._id)
        .then(ordersArr => {
            //console.log("Orders", ordersArr);
            $scope.orders = ordersArr;
        })
        .then(null, (err) => { $scope.error = err});
});
