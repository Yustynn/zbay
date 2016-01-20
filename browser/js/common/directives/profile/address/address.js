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
        controller: ($scope, UserFactory, $timeout) => {

            $scope.updated = false;

            $scope.saveAddress = function (user) {
                UserFactory.updateUser(user._id, user)
                    .then(newUserInfo => {
                        $scope.updated = true;
                        $scope.user = newUserInfo;
                        $timeout(() => {
                            $scope.updated = false;
                        }, 3000);
                    });
            }
        }
    }
});
