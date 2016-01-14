app.directive('categorydropdown', (CategoryFactory) => {
  return {
    restrict : 'E',
    replace : true,
    templateUrl : 'js/common/directives/category-dropdown/category-dropdown.html',
    link : function(scope) {
      // Get all categories
      CategoryFactory.getCategory()
        .then( data => {
          scope.categories = data;
        });
    }
  };
});
