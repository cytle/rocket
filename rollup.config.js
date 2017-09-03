import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    moduleName: 'Rocket',
  },
  plugins: [
    resolve(),
    babel(babelrc()),
  ],
};
