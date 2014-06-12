(function(root) {
  root.app = angular.module("codeChallenge", ["ngRoute"])
    .config(["$routeProvider", function($routeProvider) {
      $routeProvider
        .when("/search", {
          templateUrl: "templates/search.html",
          controller: "SearchCtrl",
          controllerAs: "searchCtrl",
          reloadOnSearch: false
        })
        .otherwise({
          templateUrl: "templates/home.html",
          controller: "HomeCtrl"
        })
    }]);
}(window = window || {}));