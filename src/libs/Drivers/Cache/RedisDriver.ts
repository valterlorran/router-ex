import { CacheDriver } from './CacheDriver';
import { CacheLock } from './CacheLock';
export class RedisDriver extends CacheDriver {
    get(key: string, def?: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    has(key: string): Promise<Boolean> {
        throw new Error('Method not implemented.');
    }
    increment(key: string, amount?: Number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    decrement(key: string, amount?: Number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    remeber(key: string, duration: Number, callback: CallableFunction): Promise<any> {
        throw new Error('Method not implemented.');
    }
    remeberForever(key: string, callback: CallableFunction): Promise<any> {
        throw new Error('Method not implemented.');
    }
    pull(key: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    put(key: string, value: any, duration?: Number): Promise<any> {
        throw new Error('Method not implemented.');
    }
    forever(key: string, value: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    forget(key: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    flush(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    lock(key: string, duration: Number): Promise<CacheLock> {
        throw new Error('Method not implemented.');
    }

}