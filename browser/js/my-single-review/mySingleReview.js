app.config($stateProvider => {
	$stateProvider.state('singularRev', {
		url: '/profile/:id',
		templateUrl: '/js/my-single-review/mySingleReview.html',
		resolve: {
			review: function($stateParams, ReviewFactory) {
				return ReviewFactory.getReview($stateParams.id)
			}
		},
		controller: function($scope,review, ProductFactory){
			$scope.review = review;
			var revId = review['_id']

		}
	})
})