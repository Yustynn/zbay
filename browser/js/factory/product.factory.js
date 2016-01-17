app.factory('ProductFactory', (HelperFactory) => {
  const factory = {};
  const url = '/api/products/';

  factory.createProduct = (payload) => {
    const obj = {
      url : url,
      method : 'POST',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.getProduct = (id) => {
    console.log("in get product");
    const obj = {
      url : url + (id ? id : ''),
      method : 'GET'
    };
    console.log(obj);
    return HelperFactory.httpResponse(obj);
  };

  factory.updateProduct = (id, payload) => {
    const obj = {
      url : url + id,
      method : 'PUT',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteProduct = (id) => {
    const obj = {
      url : url + id,
      method : 'DELETE'
    };
    return HelperFactory.httpResponse(obj);
  };

  return factory;
});
