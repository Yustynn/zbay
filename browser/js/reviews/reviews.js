app.config(function($stateProvider){
	$stateProvider.state('reviews', {
		url: '/reviews',
		templateUrl: 'js/reviews/reviews.html',
		controller: function($scope) {
			$scope.reviews = [
				{
					name: 'troy sealey',
					date: '1/1/16',
					starRating: '3/5',
					title: 'troy review',
					text: 'that troy life'
				}
			]


			$http.get('/api/reviews').then(function(reviews){
				var promises = [];
				var userData = [];
				for(var x=0;x<reviews.length;x++)
				{
					var userId = reviews[x]['user'];
					var promise = new Promise(function(){
						return User.findById(userId);
					});
					promises.push(promise);
					userData[x] = [];
					userData[x].push(userId);
				}
				Promise.all(promises).then(function(users){
					for(var y=0;y<users.length;y++)
					{
						var thisUserId = users[y]['_id'];
						for(var z=0;z<userData.length;z++)
						{
							if(userData[z][0]===thisUserId)
							{
								userData[z][1] = users[y]['name'];
								break;
							}
						}
					}
					for(var u=0;u<reviews.length;u++)
					{
						var thisUser = reviews[u]['user'];
						for(var v=0;v<userData.length;v++)
						{
							if(userData[v][0]===thisUser)
							{
								reviews[u]['user'] = userData[v][1];
								break;
							}
						}
					}
				}).then(null,next);
			})

		}
	})
})