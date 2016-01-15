app.factory('AddressFactory', (HelperFactory) => {
  const factory = {};
  const url = 'api/address/';
  // need to check that params works this way
  factory.getAddress = (id) => {
    const obj = {
      url : url + id ? id : '',
      method : 'GET',
    };
    return HelperFactory.httpResponse(obj);
  };

  factory.updateAddress = (id, payload) => {
    const obj = {
      url : url + id,
      method : 'PUT',
      data : payload
    }
    return HelperFactory.httpResponse(obj);
  };

  factory.deleteAddress = (id) => {
    const obj = {
      url : url + id,
      method : 'DELETE',
    };
    return HelperFactory.httpResponse(obj);
  };

  return factory;
});
