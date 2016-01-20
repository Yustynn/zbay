app.directive('review', function(ProductFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/review/review.html',
		link: function(scope){
			var productId = scope.product['_id'];
			let reviews;

			ProductFactory.getProductReviews(productId).then(function(reviews){
				//we got reviews based on the product.. but one problem.. we need username
				//but we only have userId for now.. we'll do Promise.all

				scope.reviews = [];
				for(var x=0; x<reviews.length; x++)
				{
					var entry = {};
					entry.text = reviews[x]['text'];
					entry.user = reviews[x]['user']['name'];
					scope.reviews.push(entry);
				}

	})
}
}})

