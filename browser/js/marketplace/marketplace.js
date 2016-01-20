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

    $scope.productsForSale = [];
    $scope.showListing = false;

    $scope.removeProduct = function(product) {
        var index = $scope.productsForSale.indexOf(product);

        ProductFactory.deleteProduct(product._id)
            .then(() => {
                $scope.productsForSale.splice(index, 1);
            });
    };

    if (!user) {
        $state.go('home');
    }


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
            $scope.productsForSale.push(newProduct);
        })
    }
});
