//= require application
//= require angular-mocks

beforeEach(function() {
  module("codeChallenge");
});

beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, $filter, $location, $injector) {
  this.http = _$httpBackend_;
  this.scope = $scope = $rootScope.$new();  
  this.controller = $controller;
  this.filter = $filter;
  this.location = $location;
  this.injector = $injector;
}));