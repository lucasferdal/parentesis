module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      '@babel/plugin-transform-export-namespace-from',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
          },
        },
      ],
    ],
    presets: ['babel-preset-expo'],
  };
};
