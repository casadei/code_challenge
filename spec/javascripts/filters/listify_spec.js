describe("listify should", function () {
  it("exists", inject(function ($filter) {
    expect($filter("listify")).not.toBeNull();
  }));

  it("return own input when it is not an array", inject(function (listifyFilter) {
    expect(listifyFilter("string")).toEqual("string");
    expect(listifyFilter(1)).toEqual(1);
    expect(listifyFilter(true)).toEqual(true);
  }));

  it("return empty string when input is an empty array", inject(function (listifyFilter) {
    expect(listifyFilter([])).toEqual("");
  }));

  it("return first index when input is an array of size 1", inject(function (listifyFilter) {
    expect(listifyFilter(["first"])).toEqual("first");
  }));

  it("return first index and second when input is an array of size 2", inject(function (listifyFilter) {
    expect(listifyFilter(["first", "second"])).toEqual("first and second");
  }));  

  it("return friendly list when input is an array of size greater than 2", inject(function (listifyFilter) {
    expect(listifyFilter(["first", "second", "third"])).toEqual("first, second and third");
    expect(listifyFilter(["first", "second", "third", "fourth"])).toEqual("first, second, third and fourth");
  }));  
});