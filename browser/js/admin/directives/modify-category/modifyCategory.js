app.directive('modifyCategory', CategoryFactory => {
  return {
    restrict: 'E',
    scope: {
      category: '='
    },
    templateUrl: 'js/admin/directives/modify-category/modify-category.html',
    link: (scope, element) => {
      scope.categoryUpdate = {};
      scope.sendCategoryUpdate = () => {
        CategoryFactory.updateCategory(scope.category._id, scope.categoryUpdate)
        .then(updatedCategory => { scope.category = updatedCategory });
      };
      scope.deleteCategory = () => {
        CategoryFactory.deleteCategory(scope.category._id)
        .then(() => { element.remove() })
      }
    }
  };
})
