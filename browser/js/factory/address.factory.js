app.factory('AddressFactory', (HelperFactory) => {
  const factory = {};
  const url = 'api/address/';
  // need to check that params works this way
  factory.getAddress = (id) => {
    const obj = {
      url : url,
      method : 'GET',
      params : id ? { id : id } : {}
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateAddress = (id, payload) => {
    const obj = {
      url : url,
      method : 'PUT',
      params : { id : id },
      data : payload
    }
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteAddress = (id) => {
    const obj = {
      url : url,
      method : 'DELETE',
      params : { id : id }
    };
    return HelperFactory.httpResponse(obj);
  };

  return factory;
});
