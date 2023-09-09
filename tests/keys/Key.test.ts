import Key from "../../src/keys/Key";

describe("Key", () => {
    it("should generate a valid mnemonic", async () => {
        const key = new Key("test");
        const mnemonic = await key.generateAccount();
        expect(mnemonic.split(" ").length).toBe(24);
    });
});