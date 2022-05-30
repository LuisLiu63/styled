import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    file: './dist/css-var.js',
    format: 'cjs'
  },
  plugins: [
    typescript()
  ]
};