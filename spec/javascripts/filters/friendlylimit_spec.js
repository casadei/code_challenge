describe("listify should", function () {
  it("exists", inject(function ($filter) {
    expect($filter("friendlyLimit")).not.toBeNull();
  }));

  it("return own input when it is not a string", inject(function (friendlyLimitFilter) {
    expect(friendlyLimitFilter(["array"])).toEqual(["array"]);
    expect(friendlyLimitFilter(1)).toBe(1);
    expect(friendlyLimitFilter(true)).toBe(true);
  }));

  it("return own input when its length is shorter than max allowed", inject(function (friendlyLimitFilter) {
    expect(friendlyLimitFilter("short string", 100)).toEqual("short string");
  }));

  it("return truncated string with suspension points when length of input is greater than max allowed", inject(function (friendlyLimitFilter) {
    expect(friendlyLimitFilter("long string", 10)).toEqual("long strin...");    
  }));
});