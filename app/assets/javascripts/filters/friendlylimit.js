(function(root) {
  root.app.filter("friendlyLimit", function() {
    return function(input, max) {
      if (typeof(input) !== "string" || !max || input.length <= max) return input;

      return input.substr(0, max) + "...";
    }
  });
}(window = window || {}));