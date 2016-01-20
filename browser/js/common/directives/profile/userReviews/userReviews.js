/**
 * Created by Jon on 1/15/16.
 */
app.directive('zbUserReviews', () => {
    return {
        restrict: 'E',
        scope: {
            reviews: '='
        },
        templateUrl: 'js/common/directives/profile/userReviews/userReviews.html',
        link: function(scope) {}
    };
});
no