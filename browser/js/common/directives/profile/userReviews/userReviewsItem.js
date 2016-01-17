/**
 * Created by Jon on 1/17/16.
 */
app.directive('zbUserReviewItem', function() {
    return {
        restrict: 'E',
        scope: {
            review: '=' // review array from controller
        },
        template: '<a ng-href="/reviews/{{review._id}}">Link To review page?</a>{{review}}',
        link: function () {
        }
    }
});
