const nodeCache = require('../config/node-cache-config');

const read = key => nodeCache.get(key);
const write = (key, value) => nodeCache.set(key, value);
const deleteEntry = key => nodeCache.del(key);

module.exports = {
    read,
    write,
    deleteEntry
};
