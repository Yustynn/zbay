/**
 * Created by Jon on 1/17/16.
 */
app.directive('zbOrderHistoryItem', function() {
    return {
        restrict: 'E',
        scope: {
            order: '='
        },
        template: '<a ng-href="/orders/{{order._id}}"></a>Order Number: {{order._id}} Order Status: {{order.status}}'
    };
});
