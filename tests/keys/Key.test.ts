import Key from "../../src/keys/Key";

describe("Key", () => {
    it("should generate a valid mnemonic", async () => {
        const key = new Key("test");
        const mnemonic = await key.generateAccount();
        expect(mnemonic.split(" ").length).toBe(24);
    });

    it("should import a valid mnemonic", async () => {
        const key = new Key("test");
        const mnemonic = await key.generateAccount();
        const imported = key.importAccount("test", mnemonic);
        expect(imported).toBe(true);
    });

    it("should sign a message", async () => {
        const key = new Key("test");
        const mnemonic = await key.generateAccount();
        const message = "Hello World";
        const signature = key.sign(message);
        expect(signature.length).toBeGreaterThan(0);
    });

    it("should verify a message", async () => {
        const key = new Key("test");
        const mnemonic = await key.generateAccount();
        const message = "Hello World";
        const signature = key.sign(message);
        const verified = key.verify(message, signature, key.address());
        expect(verified).toBe(true);
    });

    it("should fail to verify a message with a different key", async () => {
        const key = new Key("test");
        const mnemonic = await key.generateAccount();
        const message = "Hello World";
        const signature = key.sign(message);
        const key2 = new Key("test2");
        await key2.generateAccount();
        const verified = key.verify(message, signature, key2.address());
        expect(verified).toBe(false);
    });

    it("should fail to verify a message with a different message", async () => {
        const key = new Key("test");
        const mnemonic = await key.generateAccount();
        const message = "Hello World";
        const signature = key.sign(message);
        const verified = key.verify("Hello World!", signature, key.address());
        expect(verified).toBe(false);
    });

    it("should fail to verify a message with a different signature", async () => {
        const key = new Key("test");
        const mnemonic = await key.generateAccount();
        const message = "Hello World";
        const signature = key.sign(message);
        const verified = key.verify(message, signature + "00", key.address());
        expect(verified).toBe(false);
    });

    it("should produce a valid hash", async () => {
        const key = new Key("test");
        const mnemonic = await key.generateAccount();
        const message = "Hello World";
        const hash = key.hash(message);
        expect(hash.length).toBeGreaterThan(0);
    });

    it("should produce a different hash for different messages", async () => {
        const key = new Key("test");
        const mnemonic = await key.generateAccount();
        const message = "Hello World";
        const hash = key.hash(message);
        const hash2 = key.hash(message + "!");
        expect(hash).not.toBe(hash2);
    });

    it("should return the account as JSON", async () => {
        const key = new Key("test");
        const mnemonic = await key.generateAccount();
        const json = key.getAccountAsJson();
        expect(json.length).toBeGreaterThan(0);
    });

    it("should return a valid public key", async () => {
        const key = new Key("test");
        const mnemonic = await key.generateAccount();
        const public_key = key.publicKey();
        expect(public_key.length).toBeGreaterThan(0);
    });
});