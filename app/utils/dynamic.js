import React from 'react';
import Loadable from 'react-loadable';

export default function (loader, Loading) {
   
    return Loadable({
        loader: typeof loader === 'function' ? loader : () => loader,
        loading: Loading ? <Loading /> : () => (<div>Loading</div>),
    });
};