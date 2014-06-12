describe("SearchCtrl should", function () {
  var createController;

  beforeEach(function() {
    self = this;
    createController = function() {
      return self.controller('SearchCtrl', { $scope : self.scope, $location: self.location, $http: self.http });
    }
  });

  it("exists", inject(function () {
    expect(createController()).not.toBeNull();
  }));
});