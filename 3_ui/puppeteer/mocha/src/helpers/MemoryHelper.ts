class MemoryHelper {

    private readonly cache: Map<any, any>;

    constructor() {
        this.cache = new Map();
    }

    public has(key: any) {
        return this.cache.has(key);
    }

    public set(key: any, value: any) {
        return this.cache.set(key, value);
    }

    public get(key: any) {
        return this.cache.get(key);
    }

    public delete(key: any) {
        return this.cache.delete(key);
    }

    public clear() {
        return this.cache.clear();
    }
}

export const memoryHelper = new MemoryHelper();
