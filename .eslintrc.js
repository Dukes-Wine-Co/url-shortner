module.exports = {
    'env': {
        'mocha': true,
        'es6': true
    },
    'extends': "@dukes-wine/eslint-config-dukes-wine",
    'parser': 'babel-eslint',
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 8,
    },
    "overrides": [
        {
            "files": ['src/routes/base-routes.js'],
            "rules": {
                "prefer-const": "off"
            }
        }
    ]
};
