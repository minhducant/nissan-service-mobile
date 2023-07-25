module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@configs': './src/configs',
          '@context': './src/context',
          '@i18n': './src/i18n',
          '@pages': './src/pages',
          '@stores': './src/stores',
          '@repository': './src/repository',
          '@routes': './src/routes',
          '@styles': './src/styles',
          '@common': './src/common',
          '@services': './src/services',
          '@data': './src/data',
        },
      },
    ],
  ],
};
