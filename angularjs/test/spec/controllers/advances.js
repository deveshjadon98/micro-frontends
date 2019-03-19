describe('Customers Controller', function () {

  var scope, ctrl,httpBackend,ENV,DEF,_customersService;

  beforeEach(module('mateliApp'));

  beforeEach(inject(function ($rootScope, $controller,$q, _$timeout_,$injector,_ENV_,_DEF_) {
    _advancesService = jasmine.createSpyObj('advancesService', ['getAdvances']);

    scope = $rootScope.$new();
    $timeout = _$timeout_;
    httpBackend  = $injector.get ('$httpBackend');
    ENV = _ENV_;
    DEF = _DEF_;

    jasmine.getJSONFixtures().fixturesPath='base/test/mock';

    _advancesService.getAdvances.and.returnValue($q.when(
        getJSONFixture('advances.json')
    ));

    httpBackend.when('GET', 'modules/shared/layout.html').respond(function() {
      return [200, ""];
    });
    httpBackend.when('GET', 'modules/authorization/login/login.html').respond(function() {
      return [200, ""];
    });

    ctrl = $controller('advancesCtrl', {
      $scope: scope,
      advancesService: _advancesService
    });

  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation ();
  });

  it('should get advances_list', function() {
    expect(_advancesService.getAdvances).toHaveBeenCalled();
  });

  it('should set variables', function() {
    expect(scope.gridOptions).toBeDefined();
    expect(scope.formData).toEqual({ startElement: 0, numElements: 20 });
    expect(scope.currentPage).toEqual(1);
    expect(scope.pageSize).toEqual(DEF.pageSizes[0]);
  });

  it('should change page on grid', function() {
    scope.getAdvances(2);
    $timeout.flush();
    expect(scope.currentPage).toEqual(2);
    expect(scope.gridOptions.data.length).toEqual(5);
  });
});
