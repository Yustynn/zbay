describe('ProductFactory', () => {
  const baseUrl = '/api/products/';
  const id = '123';
  const response = {
    key: 'value'
  };

  let $httpBackend, ProductFactory;

  beforeEach(module('FullstackGeneratedApp'));
  beforeEach('Get $httpBackend', inject(_$httpBackend_ => {
    $httpBackend = _$httpBackend_;
  }));
  beforeEach('Get ', inject(_ProductFactory_ => {
    ProductFactory = _ProductFactory_;
  }));

  // it('should be an object', () => {
  //   expect(ProductFactory).to.be.an('object');
  // });

  const testInfo = {
    GET: [{
      methodName: 'getProduct'
    }]
    // PUT: [{
    //   methodName: 'updateProduct',
    //   appendId: true
    // }],
    // POST: [{
    //   methodName: 'getAllTheThings',
    //   appendId: true
    // }],
    // DELETE: [{
    //   methodName: 'getAllTheThings',
    //   appendId: true
    // }]
  }



  for (let requestType in testInfo) {
    testInfo[requestType].forEach(requestInfo => {
      const url = requestInfo.appendId ? baseUrl + id : baseUrl;
      const describeStr = requestInfo.methodName + ' method makes a ' + requestType + ' request to ' + url;

      describe(describeStr, () => {
        afterEach(() => {
          $httpBackend.verifyNoOutstandingExpectation();
          $httpBackend.verifyNoOutstandingRequest();
        });
        const itStr = 'should make the ' + requestType + ' request';

        it(itStr, done => {
          $httpBackend['expect' + requestType](url);
          $httpBackend['when' + requestType](url).respond(response);
          ProductFactory[requestInfo.methodName](requestInfo.appendId ? id : '')
            .then(responseData => {
              expect(responseData).to.be.deep.equal(response);
              done()
            })

          $httpBackend.flush();
        })
      });
    })
  }
});
