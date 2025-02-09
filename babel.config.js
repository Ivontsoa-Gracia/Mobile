module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        safe: false,         // Optionnel, selon vos besoins
        allowUndefined: true,  // Permet d'éviter des erreurs si une variable est absente
      }],
   ],
  };
};