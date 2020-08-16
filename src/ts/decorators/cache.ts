import { LocalStorageManager, SessionStorageManager } from 'ts/storage/storage-manager';
import { deepClone } from 'ts/clone';

// tslint:disable-next-line:ban-types
const unloadHandlers: { [key: string]: Function } = {};
const cacheKey = '_cache';
const localData = LocalStorageManager.get(cacheKey, false) || {};
const sessionData = SessionStorageManager.get(cacheKey, false) || {};

/**
 * 回寫到storage
 */
window.addEventListener('unload', () => {
    // tslint:disable-next-line:forin
    for (let i in unloadHandlers) {
        unloadHandlers[i]();
    }
    LocalStorageManager.set(cacheKey, localData, false);
    SessionStorageManager.set(cacheKey, sessionData, false);
});

export function CacheLocal<T>(name: string, defaultValue: T, root: string = '_') {
    return basic.bind(localData, name, defaultValue, root);
}

export function CacheSession<T>(name: string, defaultValue: T, root: string = '_') {
    return basic.bind(sessionData, name, defaultValue, root);
}


function basic(name: string, defaultValue: any, root: string, target, key: string) {
    // tslint:disable-next-line:variable-name
    let _key = root + '.' + name + '.' + key;
    // tslint:disable-next-line:variable-name
    let _val = this[_key] = deepClone(defaultValue, this[_key]);
    unloadHandlers[_key] = () => {
        this[_key] = _val;
    };
    // Delete property.
    if (delete target[key]) {
        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            get() {
                return _val;
            },
            set(value) {
                _val = value;
            },
            enumerable: true,
            configurable: true
        });
    }
}
