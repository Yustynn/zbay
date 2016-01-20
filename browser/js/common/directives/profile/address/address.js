/**
 * Created by Jon on 1/15/16.
 */
app.directive('zbAddress', () => {
    return {
        restrict: 'E',
        scope: {
            user: '='
        },
        templateUrl: 'js/common/directives/profile/address/address.html',
        controller: function ($scope, UserFactory) {

            $scope.saveAddress = function (user) {
                UserFactory.updateUser(user._id, user)
                    .then(newUserInfo => {
                        $scope.user = newUserInfo;
                    });
            }
        }
    }
});
