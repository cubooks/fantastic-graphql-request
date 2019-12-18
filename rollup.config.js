import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import serve from 'rollup-plugin-serve';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import livereload from 'rollup-plugin-livereload';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

const isProduction = !process.env.ROLLUP_WATCH;

export default [
  {
    input: './src/index.ts',
    output: {
      name: 'graphqlRequest',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      }),
      !isProduction && htmlTemplate({
        template: 'src/template.html',
        target: 'index.html',
      }),
      !isProduction && serve({
        open: true,
        contentBase: 'dist',
      }),
      !isProduction && livereload('dist'),
    ],
  },
  {
    input: './src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      typescript(),
      eslint(),
      terser(),
    ],
  }
];
