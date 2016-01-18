app.factory('OrderItemFactory', (HelperFactory) => {
  const factory = {};
  const url = '/api/orderitem/';

  factory.createOrderItem = (payload) => {
    const obj = {
      url : url,
      method : 'POST',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.getOrderItem = (id) => {
    const obj = {
      url : url + (id ? id : ''),
      method : 'GET'
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateOrderItem = (id, payload) => {
    const obj = {
      url : url + id,
      method : 'PUT',
      data : payload
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteOrderItem = (id) => {
    const obj = {
      url : url + id,
      method : 'DELETE'
    };
    return HelperFactory.httpResponse(obj);
  };

  return factory;
});
