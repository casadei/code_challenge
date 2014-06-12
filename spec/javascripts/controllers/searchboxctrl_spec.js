describe("SearchBoxCtrl should", function () {
  var createController;

  beforeEach(function() {
    self = this;
    createController = function() {
      return self.controller('SearchBoxCtrl', { $scope : self.scope, $location: self.location });
    }
  });

  it("exists", inject(function () {
    expect(createController()).not.toBeNull();
  }));

  var FakeForm = function(valid, dirty) {
    this.$valid = valid || false;
    this.$dirty = dirty || false;

    this.$setDirty = function() {
      this.$dirty = true;
    }
  };

  describe("on submit", function() {
    it("should set form as dirty when its not valid", function() {
      var fakeForm = new FakeForm(false, false);

      createController().submit(fakeForm);

      expect(fakeForm.$dirty).toBe(true);
    });

    it("should update url with parameters with query when form is valid", function() {
      var ctrl = createController();
      ctrl.query = "keyword";
      ctrl.submit( new FakeForm(true, true));

      expect(this.location.url()).toEqual("/search?q=keyword");
    });

    it("should update url with values of options parameters when they are defined", function() {
      var ctrl = createController();

      ctrl.query = "keyword";
      ctrl.opts = { filtering: "filtering", printType: "printType", orderBy: "orderBy" }
      ctrl.submit(new FakeForm(true, true));

      expect(this.location.url()).toEqual("/search?q=keyword&filtering=filtering&printType=printType&orderBy=orderBy");
    });

    it("should update url without options parameters when these values are empty", function() {
      var ctrl = createController();

      ctrl.query = "keyword";
      ctrl.opts = { filtering: "", printType: "", orderBy: "" }
      ctrl.submit(new FakeForm(true, true));

      expect(this.location.url()).toEqual("/search?q=keyword");      
    });
  });

  it("should toggle options", function() {
    var ctrl = createController();
    ctrl.showOptions = false;

    ctrl.toggleOptions();
    expect(ctrl.showOptions).toBe(true);
    ctrl.toggleOptions();
    expect(ctrl.showOptions).toBe(false);    
  });

  it("should clear options values", function() {
    var ctrl = createController();
    ctrl.opts = { filtering: "filtering", printType: "printType", orderBy: "orderBy" }

    ctrl.resetOptions();
    expect(ctrl.opts).toEqual({});
  });

  it("should fill variables (query and options) with queryString content", function() {
    var expected = {
      q: "expectedQuery",
      filtering: "expectedFiltering",
      printType: "expectedPrintType",
      orderBy: "expectedOrderBy"
    };

    this.location.search(expected);

    var ctrl = createController();
    ctrl.restoreParameters();

    expect(ctrl.query).toEqual(expected.q);
    expect(ctrl.opts.filtering).toEqual(expected.filtering);
    expect(ctrl.opts.printType).toEqual(expected.printType);
    expect(ctrl.opts.orderBy).toEqual(expected.orderBy);
  });
});