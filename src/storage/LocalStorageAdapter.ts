export default class LocalStorageAdapter {
    // Constructor
    constructor() {
        this.init();
    }

    // Public methods
    public setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public getItem(key: string): string {
        return localStorage.getItem(key);
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    // Private methods
    private init(): void {
        if (!this.isLocalStorageAvailable()) {
            throw new Error('Local storage is not available');
        }
    }

    private isLocalStorageAvailable(): boolean {
        try {
            const testKey = 'test';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    } 
}