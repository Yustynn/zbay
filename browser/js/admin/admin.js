app.config($stateProvider => {
  $stateProvider.state('admin', {
    controller: 'AdminCtrl',
    resolve: {
      categories: function(CategoryFactory) {
        return CategoryFactory.getCategory();
      },
      users: function(UserFactory) {
        return UserFactory.getUser();
      }
    },
    templateUrl: 'js/admin/admin.html',
    url: '/admin'
  });
})
