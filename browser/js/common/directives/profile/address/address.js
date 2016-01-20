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
        controller: function ($scope, UserFactory, AddressFactory) {

            $scope.saveAddress = function (user) {
                console.log("user in saveAddy func", user);

                UserFactory.updateUser(user._id, user)
                    .then(newUserInfo => {
                        console.log(newUserInfo);
                        $scope.user = newUserInfo;
                    });
            }
        }
    }
});
