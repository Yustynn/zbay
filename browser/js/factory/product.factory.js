app.factory('ProductFactory', (HelperFactory) => {
  const factory = {};
  const url = '/api/product/';

  factory.createProduct = (payload) => {
    const obj = {
      url : url,
      method : 'POST',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.getProduct = (id) => {
    const obj = {
      url : url,
      method : 'GET',
      params : id ? { id : id } : {}
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateProduct = (id, payload) => {
    const obj = {
      url : url,
      method : 'PUT',
      params : { id : id },
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteProduct = (id) => {
    const obj = {
      url : url,
      method : 'DELETE',
      params : { id : id }
    };
    return HelperFactory.httpResponse(obj);
  };

  return factory;
});

