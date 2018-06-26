import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import minify from 'rollup-plugin-minify-es';
import progress from 'rollup-plugin-progress';

export default [
  // cognos-friendly AMD build
  {
    input: 'src/index.js',
    output: {
      name: 'CognosRSSReaderControl',
      file: pkg.browser,
      format: 'amd'
    },
    plugins: [
      progress({
        clearLine: false // default: true
      }),
      globals(),
      builtins(),
      babel({
        exclude: 'node_modules/entities/**'
      }),
      resolve({
        exclude: 'node_modules/entities/**'
      }),
      commonjs({
        exclude: 'node_modules/entities/**',
        namedExports: {
          // left-hand side can be an absolute path, a path
          // relative to the current directory, or the name
          // of a module in node_modules
          'rss-parser/dist/rss-parser': ['RSSParser'],
          'node_modules/sax/lib/sax.js': ['sax'],
          sax: ['sax']
        }
      }),
      minify()
    ]
  },
  // cognos-friendly AMD build
  {
    input: 'src/index.js',
    output: {
      name: 'CognosRSSReaderControl',
      file: pkg.main,
      format: 'amd'
    },
    plugins: [
      progress({
        clearLine: false // default: true
      }),
      globals(),
      builtins(),
      babel({
        exclude: 'node_modules/entities/**'
      }),
      resolve({
        exclude: 'node_modules/entities/**'
      }),
      commonjs({
        exclude: 'node_modules/entities/**',
        namedExports: {
          // left-hand side can be an absolute path, a path
          // relative to the current directory, or the name
          // of a module in node_modules
          'rss-parser/dist/rss-parser': ['RSSParser'],
          'node_modules/sax/lib/sax.js': ['sax'],
          sax: ['sax']
        }
      })
    ]
  }
];
