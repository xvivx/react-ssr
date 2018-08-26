import webpack from 'webpack';
import express from 'express';
import config from '../webpack/client.prd';
import dirs from '../configs/index';

webpack(config).run(function (a, b) {
    console.log('---------------------');

    var app = express();

    app.use(express.static(dirs.clientOutput));
    app.listen(3000);
});