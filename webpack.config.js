module.exports = {
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.module.scss$/,
        use: [
          'scss-loader',
          {
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
        ],
      },
    ],
  },
};
