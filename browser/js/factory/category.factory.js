/**
 *  Get all categories and add a category
 *  Using $http instead of $http.get, $http.post for explicitness, aesthetics
 */
app.factory('CategoryFactory', HelperFactory => {
  const factory = {};
  const url = '/api/categories/';

  factory.addCategory = (categoryInfo) => {
    const obj = {
      url : url,
      method : 'POST',
      data : categoryInfo
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.getCategory = id => {
    const obj = {
      url : url + (id ? id : ''),
      method : 'GET'
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateCategory = (id, update) => {
    const obj = {
      url : url + id,
      method : 'PUT',
      data : update
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteCategory = id => {
    const obj = {
      url : url + id,
      method : 'DELETE'
    };
    return HelperFactory.httpResponse(obj);
  };

  return factory;
});
