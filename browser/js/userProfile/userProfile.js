/**
 * Created by Jon on 1/15/16.
 */
app.config($stateProvider => {

    $stateProvider.state('userProfile', {
        url: '/profile',
        templateUrl: 'js/userProfile/userProfile.html',
        resolve: {
            //test: function() {
            //    return "You will work";
            //},
            hibuddy: function(AuthService) {
                console.log(AuthService)
                return AuthService.getLoggedInUser().then(user => user);
            }
        },
        controller: 'ProfileCtrl'

    });
});

app.controller('ProfileCtrl', function($scope, hibuddy, UserFactory) {
    $scope.showShipping = false;
    $scope.error = null;
    //console.log(test);
    console.log("user", hibuddy)

    //
    //if (!user) {
    //    console.log("No user Found");
    //    $state.go('home');
    //}
    //
    //UserFactory.getReviewsForUser(user._id)
    //    .then(reviewsArr => {
    //        //console.log(reviewsArr)
    //        $scope.reviews = reviewsArr;
    //    })
    //    .then(null, (err) => { $scope.error = err});
    //



    $scope.orders = [   // Dummy data; Implement this with factory call to DB
        {
            _id: Math.floor(Math.random() * 10000000),
            datetime: Date.now(),
            status: 'shipped'
        },
        {
            _id: Math.floor(Math.random() * 10000000),
            datetime: Date.now(),
            status: 'shipped'
        },
        {
            _id: Math.floor(Math.random() * 10000000),
            datetime: Date.now(),
            status: 'shipped'
        },
        {
            _id: Math.floor(Math.random() * 10000000),
            datetime: Date.now(),
            status: 'shipped'
        }
    ]

    $scope.products = [
        {
            title: "Product title 1",
            description: "Some description1"
        },
        {
            title: "Product title 2",
            description: "Some description2"
        }
    ]
    console.log("End of ctrl")
});
