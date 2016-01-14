/**
 *  Get all categories and add a category
 *  Using $http instead of $http.get, $http.post for explicitness, aesthetics
 */
app.factory('CategoryFactory', (HelperFactory) => {
  const factory = {};

  factory.addCategory = (category) => {
    const obj = {
      url : '/api/categories/',
      method : 'POST',
      data : { name : category }
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.getCategory = () => {
    const obj = {
      url : 'api/categories/',
      method : 'GET'
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateCategory = (id) => {
    const obj = {
      url : 'api/categories/',
      method : 'PUT',
      params : { id : id } // need to verify this
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteCategory = (id) => {
    const obj = {
      url : 'api/categories/',
      method : 'DELETE',
      params : { id : id } // need to verify this
    };
    return HelperFactory.httpResponse(obj);
  };

  return factory;
});

