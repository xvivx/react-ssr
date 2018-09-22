import webpack from 'webpack';
import config from '../webpack/test.config';

var compiler = webpack(config);

compiler.run(() => {
    console.log('------------done')
})