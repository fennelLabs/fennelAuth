import LocalStorageAdapter from "./LocalStorageAdapter";

export default class StorageShare {
    // Properties
    private share: string;
    private localStorageAdapter: LocalStorageAdapter;

    constructor(share: string) {
        this.localStorageAdapter = new LocalStorageAdapter();
        this.init(share);
    }

    public saveShare(): void {
        this.localStorageAdapter.setItem('share', this.share);
    }

    public getShare(): string {
        return this.localStorageAdapter.getItem('share');
    }

    public removeShare(): void {
        this.localStorageAdapter.removeItem('share');
    }

    private init(share: string): void {
        this.share = share;
    }
}