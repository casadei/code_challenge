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

    this.isNotForSale = function(book) {
      return book && book.sale == "NOT_FOR_SALE";
    };

    this.isForFree = function(book) {
      return book && book.sale == "FREE";      
    };

    this.isForSale = function(book) {
      return book && book.sale == "FOR_SALE"
    };

  });
}(window = window || {}));