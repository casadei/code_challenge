(function(root) {
  root.app.filter("listify", function() {
    return function(input) {
      if (!Array.isArray(input)) return input;
      if (input.length == 0) return "";
      if (input.length == 1) return input[0];

      var first = input.slice(0, input.length - 1);
      var last = input[input.length - 1];

      return first.join(", ") + " and " + last;
    }
  });
}(window = window || {}));