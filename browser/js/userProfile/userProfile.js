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

app.controller('ProfileCtrl', ($scope, $state, user, UserFactory) => {
    $scope.showShipping = false;
    $scope.error = null;

    if (!user) {
        console.log("No user Found");
        $state.go('home');
    }

    UserFactory.getReviewsForUser(user._id)
        .then(reviewsArr => {
            $scope.reviews = reviewsArr;
        })
        .then(null, (err) => { $scope.error = err});

    UserFactory.getProductsForUser(user._id)
        .then(productsArr => {
            console.log("Products", productsArr);
            $scope.products = productsArr;
        })
        .then(null, (err) => { $scope.error = err});

    UserFactory.getOrdersForUser(user._id)
        .then(ordersArr => {
            console.log("Orders", ordersArr);
            $scope.orders = ordersArr;
        })
        .then(null, (err) => { $scope.error = err});

    //$scope.products = [
    //    {
    //        title: "Product title 1",
    //        description: "Some description1"
    //    },
    //    {
    //        title: "Product title 2",
    //        description: "Some description2"
    //    }
    //];

    //$scope.orders = [   // Dummy data; Implement this with factory call to DB
    //    {
    //        _id: Math.floor(Math.random() * 10000000),
    //        datetime: Date.now(),
    //        status: 'shipped'
    //    },
    //    {
    //        _id: Math.floor(Math.random() * 10000000),
    //        datetime: Date.now(),
    //        status: 'shipped'
    //    },
    //    {
    //        _id: Math.floor(Math.random() * 10000000),
    //        datetime: Date.now(),
    //        status: 'shipped'
    //    },
    //    {
    //        _id: Math.floor(Math.random() * 10000000),
    //        datetime: Date.now(),
    //        status: 'shipped'
    //    }
    //]

});
