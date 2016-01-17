// give a nested category so that it is a very general dropdown?
// Possibly unnecessary
app.directive('categorydropdown', (CategoryFactory) => {
  return {
    restrict : 'E',
    scope : {
    },
    templateUrl : 'js/common/directives/category-dropdown/category-dropdown.html',
    link : (scope) => {
      // Get all categories
      CategoryFactory.getCategory()
        .then( data => {
          scope.categories = data;
        });
      // if someone picks All Category, category in the
      // parameter will be null
      scope.updateSelection = (category) => {
        scope.category = category;
        console.log(scope.category);
      }
    }
  };
});
