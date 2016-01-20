/**
 * Created by Jon on 1/15/16.
 */
app.directive('zbOrderHistory', () => {
    return {
        restrict: 'E',
        scope: {
            orders: '=' // orders array from controller
        },
        templateUrl: 'js/common/directives/profile/orderHistory/orderHistory.html'
    };
});
