import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './page/home/HomePage'
import ToDoPage from './page/todo/ToDoPage'
import navConfig from './config/nav.config.js';
import NavBar from './componentUI/common/NavBar';

import routes from './routes';

function page(route) {
    return <Route key={route.path} {...route} />;
}

const PrimaryLayout = ({ match }) => (
    <div className="idiv-app">
        <NavBar data={navConfig} />
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/todo" component={ToDoPage} />
        {
            routes.map(route => page(route))
        }
            <Redirect to="/" />
        </Switch>
    </div>
);

export default (PrimaryLayout);