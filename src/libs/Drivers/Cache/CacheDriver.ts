import { CacheLock } from './CacheLock';
export abstract class CacheDriver {
    abstract get(key: string, def?: any): Promise<any>;
    abstract has(key: string): Promise<Boolean>;
    abstract increment(key: string, amount?: Number): Promise<void>;
    abstract decrement(key: string, amount?: Number): Promise<void>;
    abstract remeber(key: string, duration: Number, callback: CallableFunction): Promise<any>;
    abstract remeberForever(key: string, callback: CallableFunction): Promise<any>;
    abstract pull(key: string): Promise<any>;
    abstract put(key: string, value: any, duration?: Number): Promise<any>;
    abstract forever(key: string, value: any): Promise<void>;
    abstract forget(key: string): Promise<void>;
    abstract flush(): Promise<void>;
    abstract lock(key: string, duration: Number): Promise<CacheLock>;
}