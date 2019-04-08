module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        // alias: {
        //   themes: './src/themes'
        // }
      }
    ]
  ],
  sourceMaps: true
};
