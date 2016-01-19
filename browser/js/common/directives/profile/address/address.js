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
        controller: function($scope, UserFactory, AddressFactory) {

            $scope.saveAddress = function(user) {
                console.log("Inside save address")
                console.log("user",user)

                AddressFactory.addAddress(user.address)
                    .then(newAddress => {
                        UserFactory.updateUser(user._id, {address: newAddress._id, name: user.name})
                            .then(newUserInfo => {
                                console.log(newUserInfo);
                                $scope.user = newUserInfo;
                            });
                    })


            };
        }
    }
});
