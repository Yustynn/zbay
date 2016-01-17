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
        // we have the search term and the category name at this point
        // generate the page with results
        console.log(scope.search);
        console.log(childScope.category.name || "");
        scope.search = "";
        // need a child state that goes to the products.search
        // have not made that child state
        // look in products dir
        $state.go("products.all");

      }



    }
  }
});
