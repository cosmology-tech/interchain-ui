'use strict';

const compiler = require('..');
const assert = require('assert').strict;

assert.strictEqual(compiler(), 'Hello from compiler');
console.info('compiler tests passed');
