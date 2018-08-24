import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import navConfig from './config/nav.config.js';
import NavBar from './componentUI/common/NavBar';
import HomePage from './page/HomePage';
import ToDoApp from './page/ToDoPage';
import CounterPage from './page/CounterPage';
import OlamiPage from './page/OlamiPage';

const PrimaryLayout = ({ match }) => (
    <div className="idiv-app">
        <NavBar data={navConfig} />
        <Switch>
            <Route path="/" exact component={ HomePage } />
            <Route path="/todo" component={ ToDoApp } />
            <Route path="/counter" component={ CounterPage } />
            <Route path="/olami" component={ OlamiPage } />
            <Redirect to="/"/>
        </Switch>
    </div>
);

export default (PrimaryLayout);