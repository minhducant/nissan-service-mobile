module.exports = {
  root: true,
  extends: '@react-native-community',
  settings: {
    'import/resolver': {
      alias: [
        ['@assets', './src/assets'],
        ['@components', './src/components'],
        ['@configs', './src/configs'],
        ['@context', './src/context'],
        ['@i18n', './src/i18n'],
        ['@pages', './src/pages'],
        ['@stores', './src/stores'],
        ['@repository', './src/repository'],
        ['@routes', './src/routes'],
        ['@styles', './src/styles'],
        ['@common', './src/common'],
        ['@data', './src/data'],
      ],
    },
  },
};
