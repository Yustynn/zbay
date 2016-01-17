app.factory('OrderFactory', (HelperFactory) => {
  const factory = {};
  const url = '/api/orders/';

  factory.createOrder = (payload) => {
    const obj = {
      url : url,
      method : 'POST',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.getOrder = (id) => {
    const obj = {
      url : url + (id ? id : ''),
      method : 'GET'
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateOrder = (id, payload) => {
    const obj = {
      url : url + id,
      method : 'PUT',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteOrder = (id) => {
    const obj = {
      url : url + id,
      method : 'DELETE'
    };
    return HelperFactory.httpResponse(obj);
  };

  return factory;
});
