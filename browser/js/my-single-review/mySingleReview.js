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
			$scope.starArray = [];
			var num = $scope.review.starRating;
			for(var x=0; x<num; x++)
			{
				$scope.starArray.push(1);
			}
			console.log($scope.starArray);
			var revId = review['_id'];

		}
	})
})