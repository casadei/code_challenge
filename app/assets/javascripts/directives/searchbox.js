(function(root) {
  root.app.directive("searchBox", function() {
    return {
      restrict: "E",
      templateUrl: "/templates/search-box.html",
      controller: "SearchBoxCtrl",
      controllerAs: "searchBoxCtrl"
    }
  });
}(window = window || {}));