import LocalStorageAdapter from "../../src/storage/LocalStorageAdapter";

describe("LocalStorage", () => {
  it("should set and get a value", () => {
    const localStorage = new LocalStorageAdapter();
    localStorage.setItem("test", "test");
    expect(localStorage.getItem("test")).toBe("test");
  });

  it("should remove a value", () => {
    const localStorage = new LocalStorageAdapter();
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    expect(localStorage.getItem("test")).toBeNull();
  });
});
