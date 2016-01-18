app.directive('review', function(ProductFactory,UserFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/review/review.html',
		link: function(scope){
			var productId = scope.product['_id'];
			let reviews;

				console.log(123)
			ProductFactory.getProductReviews(productId).then(function(reviews){
				//we got reviews based on the product.. but one problem.. we need username 
				//but we only have userId for now.. we'll do Promise.all

				console.log('cha cha ',reviews);
				// console.log('woom woom ',reviews);
				scope.reviews = [];
				for(var x=0; x<reviews.length; x++)
				{
					var entry = {};
					entry['text'] = reviews[x]['text'];
					entry['user'] = reviews[x]['user']['name'];
					scope.reviews.push(entry);
				}






			// 	console.log(123)

			// 	reviews = reviewsWithoutUsers
			// 	const promsForUsers = reviewsWithoutUsers.map(review => UserFactory.getUser(review['user']));
			// 	return Promise.all(promsForUsers)
			// })
			// .then(users => {
			// 	reviews = reviews.map((review, i) => {
			// 		review.userName = users[i].name;
			// 		return review;
			// 	})
			// 	console.log(reviews)
			// 	console.log(123)
			// })
			// .then(null, error => { console.error(error) });
		
	})
}
}})

