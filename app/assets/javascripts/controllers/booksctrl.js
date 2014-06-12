(function(root) {
  root.app.controller("BooksCtrl", function() {
    this.getBestImage = function(book) {
      book = book || { };
      
      if (book.thumbnails) {
        if (book.thumbnails.normal)
          return book.thumbnails.normal
        if (book.thumbnails.small)
          return book.thumbnails.small;
      }

      return "/assets/nocover.png";
    };
  });
}(window = window || {}));