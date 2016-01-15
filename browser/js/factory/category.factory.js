/**
 *  Get all categories and add a category
 *  Using $http instead of $http.get, $http.post for explicitness, aesthetics
 */
app.factory('CategoryFactory', (HelperFactory) => {
  const factory = {};
  const url = '/api/categories/';

  factory.addCategory = (category) => {
    const obj = {
      url : url,
      method : 'POST',
      data : { name : category }
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.getCategory = () => {
    const obj = {
      url : url,
      method : 'GET'
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateCategory = (id) => {
    const obj = {
      url : url + id,
      method : 'PUT'
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteCategory = (id) => {
    const obj = {
      url : url + id,
      method : 'DELETE'
    };
    return HelperFactory.httpResponse(obj);
  };

  return factory;
});

