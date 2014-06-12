(function(root) {
  root.app.controller("SearchBoxCtrl", [ "$scope", "$location", function($scope, $location) {
    this.showOptions = false;
    this.query = "";
    this.opts = { };

    this.isValid = function(form) {
      return !form.$dirty || form.$valid;
    }

    this.submit = function(form) {
      if (!form.$valid) {
        form.$setDirty();
        return;
      }

      var parameters = { "q" : this.query };

      if (this.opts.filtering) parameters.filtering = this.opts.filtering;
      if (this.opts.printType) parameters.printType = this.opts.printType;
      if (this.opts.orderBy) parameters.orderBy = this.opts.orderBy;

      $location.path('/search').search(parameters);
    };

    this.toggleOptions = function() {
      this.showOptions = !this.showOptions;
    };

    this.resetOptions = function() {
      this.opts = { };
    };

    this.restoreParameters = function() {
      var parameters = $location.search() || { };    

      this.query = parameters.q;
      this.opts.filtering = parameters.filtering;
      this.opts.printType = parameters.printType;
      this.opts.orderBy = parameters.orderBy;
    };

    $scope.$watch(function() { return $location.search() }, this.restoreParameters.bind(this));
  }]);
}(window = window || {}));