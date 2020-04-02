#!/usr/bin/env node
require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  presets: [
    ['@babel/preset-env', { targets: { node: '6.9.0' }, useBuiltIns: 'usage', corejs: 3 }],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import'],
  cache: false,
})

const { run } = require('../src/cli')

run()
