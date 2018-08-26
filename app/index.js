import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store/store.js';
import App from './AppRoutes';


const hotRender = Component => {
    ReactDOM.render(
            <Provider store={ store }>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>,
        document.getElementById('root')
    );
};


if (module.hot) {
    module.hot.accept('./AppRoutes.js', () => {
        hotRender(App);
    });
}

hotRender(App);
