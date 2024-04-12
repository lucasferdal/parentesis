module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ['@babel/plugin-transform-export-namespace-from'],
    presets: [['babel-preset-expo']],
  };
};
