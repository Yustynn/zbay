app.controller('AdminCtrl', ($scope, categories, CategoryFactory) => {
  $scope.categories = categories;
  $scope.categoryInfo = {}
  $scope.createCategory = (categoryInfo) => {
    CategoryFactory.addCategory(categoryInfo)
    .then(createdCategory => {
      $scope.categories.unshift(createdCategory)
    })
    .then(null, console.error.bind(console))
  }
});
