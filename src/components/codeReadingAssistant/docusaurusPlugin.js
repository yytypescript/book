const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
/**
 * @param context {import('@docusaurus/types').LoadContext}
 * @param options {{}}
 * @return {import('@docusaurus/types').Plugin}
 */
module.exports = (context, options) => ({
  name: "monaco-editor",
  configureWebpack: (config, isServer) => {
    return {
      plugins: [new MonacoWebpackPlugin({ languages: ["typescript"] })],
    };
  },
});
