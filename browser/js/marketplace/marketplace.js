app.config($stateProvider => {

    $stateProvider.state('marketplace', {
        url: '/marketplace',
        templateUrl: 'js/marketplace/marketplace.html',
        controller: 'MarketplaceCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser().then(user => user);
            }
        }
    });
});

app.controller('MarketplaceCtrl', ($scope, ProductFactory, CategoryFactory, UserFactory, user, $state) => {

    if (!user) {
        //console.log("No user Found");
        $state.go('home');
    }

    $scope.productsForSale = [];

    UserFactory.getProductsForUser(user._id)
        .then(productsForUser => {
            $scope.productsForSale = productsForUser;
        });

    CategoryFactory.getCategory()
        .then( data => {
            $scope.categories = data;
        });

    $scope.createProduct = function() {
        ProductFactory.createProduct({
            title: $scope.title,
            categories: $scope.category,
            description: $scope.description,
            price: $scope.price,
            stock: $scope.stock
        })
        .then(newProduct => {
            //console.dir(newProduct);
            $scope.productsForSale.push(newProduct);
        })
    }
});
