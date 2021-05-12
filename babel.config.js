const fs = require('fs');
const path = require('path');

const alias = fs
  .readdirSync(path.resolve('src'), { withFileTypes: true })
  .filter(d => d.isDirectory())
  .reduce((acc, dir) => ({
    ...acc,
    [dir.name]: `./src/${dir.name}`,
  }), {});

module.exports = api => {
  api.cache(false);

  return {
    presets: [ 'babel-preset-expo' ],
    plugins: [
      [
        'module-resolver',
        {
          root: [ './src' ],
          alias,
        },
      ],
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
    ],
  };
};
