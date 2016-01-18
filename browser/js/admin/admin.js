app.config($stateProvider => {
  $stateProvider.state('admin', {
    controller: 'AdminCtrl',resolve: {
      categories: function(CategoryFactory) {
        return CategoryFactory.getCategory();
      }
    },
    templateUrl: 'js/admin/admin.html',
    url: '/admin'
  });
})
