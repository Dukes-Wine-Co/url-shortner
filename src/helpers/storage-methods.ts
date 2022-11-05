import nodeCache from '../config/node-cache-config';

export const read = key => nodeCache.get(key);
export const write = (key, value) => nodeCache.set(key, value);
export const deleteEntry = key => nodeCache.del(key);
