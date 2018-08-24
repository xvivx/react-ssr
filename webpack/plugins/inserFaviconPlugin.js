const port = require('../config').port || 3000;
const iconPath = `http://localhost:${port}/favicon.ico`;

class InserFaviconPlugin {
    apply(compiler) {
        compiler.plugin('compilation', function (compilation) {
            compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
                const content = `<link rel="shortcut icon" href="${iconPath}">`;
                htmlPluginData.html = htmlPluginData.html.replace('<title>', content + '<title>');
                callback(null, htmlPluginData);
            });
        });
    }
};

module.exports = InserFaviconPlugin;
