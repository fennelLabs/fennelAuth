import StorageShare from "../../src/storage/StorageShare";

describe("StorageShare", () => {
    it("should set and get a value", () => {
        const storageShare = new StorageShare("test");
        storageShare.saveShare();
        expect(storageShare.getShare()).toBe("test");
    });

    it("should remove a value", () => {
        const storageShare = new StorageShare("test");
        storageShare.saveShare();
        storageShare.removeShare();
        expect(storageShare.getShare()).toBeNull();
    });
});