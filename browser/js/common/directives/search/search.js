/**
 *  Search bar
 *  Might want to include the Product factory
 *  so that the search has dynamic capability
 *  main functionality of a search bar, is to send user to a product route or
 *  if search term does not exist, it sends the user to a product not found page
 */
app.directive('searchbar', ($state) => {
  return {
    restrict : 'E',
    templateUrl : 'js/common/directives/search/search.html',
    link : (scope, elem) => {

      scope.submit = () => {

        let childElem = elem.find('categorydropdown');
        let childScope = childElem.isolateScope();
        let obj = {
          search : scope.search,
          category : (childScope.category ? childScope.category.name : "")
        }
        $state.go("products.search", obj);
        scope.search = "";

      }



    }
  }
});
