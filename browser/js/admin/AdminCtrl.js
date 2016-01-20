app.controller('AdminCtrl', ($scope, categories, CategoryFactory, UserFactory, users) => {
  $scope.adminify = email => {
    const user = users.find(user => user.email === email);
    if (!user) {
      delete $scope.adminifySuccess;
      $scope.adminifyError = 'User ' + email + ' Not Found!';
    }
    else {
      UserFactory.updateUser(user._id, { isAdmin: true })
      .then(() => {
        user.isAdmin = true; // Update local version to reflect DB
        delete $scope.adminifyError;
        $scope.adminifySuccess = 'User ' + email + ' Adminified!'
      })
    }
  };
  $scope.categories = categories;
  $scope.categoryInfo = {};

  $scope.createCategory = categoryInfo => {
    CategoryFactory.addCategory(categoryInfo)
    .then(createdCategory => {
      $scope.categories.unshift(createdCategory)
    })
    .then(null, console.error.bind(console))
  }
});
