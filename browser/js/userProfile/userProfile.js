/**
 * Created by Jon on 1/15/16.
 */
app.config($stateProvider => {

    $stateProvider.state('userProfile', {
        url: '/profile',
        templateUrl: 'js/userProfile/userProfile.html',
        controller: 'ProfileCtrl'
    });
});

app.controller('ProfileCtrl', ($scope, AUTH_EVENTS, AuthService) => {
    $scope.showShipping = false;

    var currentUser = AuthService.getLoggedInUser().then(function(user){
        console.log('USRR ',user);
    })
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

    // $scope.reviews = [
    //     {
    //         product: "product name1",
    //         starRating: 5,
    //         text: "THIS IS A REVIEW"
    //     },
    //     {
    //         product: "product name2",
    //         starRating: 4,
    //         text: "THIS IS ANOTHER REVIEW"
    //     }
    // ]



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
});
