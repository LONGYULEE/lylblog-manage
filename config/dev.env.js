'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_URL: '"http://localhost:8081/lylblog"'
    // BASE_URL: '"http://132.232.87.31:8081/lylblog"'
});
