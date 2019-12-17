import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import serve from 'rollup-plugin-serve';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import livereload from 'rollup-plugin-livereload';

import pkg from './package.json';

const isProduction = !process.env.ROLLUP_WATCH;

const devBuild = {
  input: './src/index.ts',
  output: {
    name: 'graphqlRequest',
    file: pkg.browser,
    format: 'umd',
  },
  plugins: [
    typescript(),
    resolve(),
    htmlTemplate({
      template: 'src/template.html',
      target: 'index.html',
    }),
    serve({
      open: true,
      contentBase: 'dist',
    }),
    livereload('dist'),
  ],
};

const productionBuild = {
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
};

export default isProduction ? productionBuild : devBuild;
