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

app.controller('ProfileCtrl', $scope => {
    $scope.showShipping = false;
});
