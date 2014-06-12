(function(root) {
  root.app.controller("SearchCtrl", ["$location", "$http", "$scope", function($location, $http, $scope) {
    var PAGES_RANGE_OFFSET = 3;
    var FIRST_PAGE = 1

    this.books = [];
    this.currentPage = 0;
    this.error = false;
    this.hasPreviousPage = false;
    this.hasNextPage = false;
    this.lastPage = 1;
    this.showAsList = true;
    this.showAsGallery = false;
    this.total = 0;

    this.toggleViewMode = function() {
      this.showAsList = !this.showAsList;
      this.showAsGallery = !this.showAsGallery;
    };

    this.hasNoResult = function() {
      return !this.loading && !this.error && this.books.length == 0;
    };

    this.hasResults = function() {
      return !this.loading && !this.error && this.books.length > 0;
    };

    this.hasError = function() {
      return !this.loading && this.error;
    }

    this.closePages = function() {
      var start = Math.max(FIRST_PAGE, this.currentPage - PAGES_RANGE_OFFSET);
      var end = Math.min(this.lastPage, this.currentPage + PAGES_RANGE_OFFSET);

      var startOffSet = Math.abs(end - this.currentPage - PAGES_RANGE_OFFSET);
      var endOffset = Math.abs(this.currentPage - start - PAGES_RANGE_OFFSET);

      start = Math.max(FIRST_PAGE, start - startOffSet);
      end = Math.min(this.lastPage, end + endOffset);

      var pages = [];

      for (var i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    };

    this.isCurrentPage = function(page) {
      return page == this.currentPage;
    };

    this.previousPageUrl = function() {
      return this.changePageUrl(Math.max(FIRST_PAGE, this.currentPage - 1));
    };

    this.nextPageUrl = function() {
      return this.changePageUrl(Math.min(this.lastPage, this.currentPage + 1));
    };

    this.buildUrl = function(action, parameters) {
      var queryString = []

      for (var prop in parameters) queryString.push(prop + "=" + parameters[prop]);

      return action + "?" + queryString.join("&");
    };

    this.changePageUrl = function(page) {
      var parameters =  angular.copy($location.search());

      parameters.page = page;
      if (parameters.page == 1) delete parameters.page;

      return this.buildUrl("#/search", parameters);
    };

    this.successCallback = function (data, status, headers, config) {
      data = data || {};

      this.total = +data.total;
      this.books = data.items || [];
      this.currentPage = +$location.search().page || 1;
      this.lastPage = data.pages
      this.hasPagination = this.lastPage > 1;
      this.hasPreviousPage = this.currentPage > FIRST_PAGE;
      this.hasNextPage = this.currentPage < this.lastPage;
      this.loading = false;
    };

    this.errorCallback = function (data, status, headers, config) {
      this.loading = false;
      this.error = true;
    };

    this.load = function() {
      this.error = false;
      this.loading = true;

      $http({ method: "GET", url: "/api/books/", params: $location.search(), cache: true })
        .success(this.successCallback.bind(this))
        .error(this.errorCallback.bind(this));
    };

    $scope.$watch(function() { return $location.search() }, this.load.bind(this));
  }]);
}(window = window || {}));