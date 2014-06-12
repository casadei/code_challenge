describe("BooksCtrl should", function () {
  beforeEach(function() {
    self = this;
    createController = function() {
      return self.controller("BooksCtrl");
    }
  });

  it("exists", inject(function () {
    expect(this.controller("BooksCtrl")).not.toBeNull();
  }));

  describe("get best image", function() {
    it("should return normal when it is available", function() {
      var book = { thumbnails: { normal: "normal", small: "small" } };
      var image = createController().getBestImage(book);

      expect(image).toEqual("normal");
    });

    it("should return small thumbnail when it is available and there is not larger", function() {
      var book = { thumbnails: { small: "small" } };
      var image = createController().getBestImage(book);

      expect(image).toEqual("small");
    });

    it("should return nocover photo when none of thumbnail are available", function() {
      var book = { thumbnails: { } };
      var image = createController().getBestImage(book);

      expect(image).toEqual("/assets/nocover.png");
    });
  });
});