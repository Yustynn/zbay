app.factory('OrderFactory', (HelperFactory) => {
  const factory = {};
  const url = '/api/order/';

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
      url : url,
      method : 'GET',
      params : id ? { id : id } : {}
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateOrder = (id, payload) => {
    const obj = {
      url : url,
      method : 'PUT',
      params : { id : id },
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteOrder = (id) => {
    const obj = {
      url : url,
      method : 'DELETE',
      params : { id : id }
    };
    return HelperFactory.httpResponse(obj);
  };

  return factory;
});
