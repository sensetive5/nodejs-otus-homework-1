module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["google", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {},
};
