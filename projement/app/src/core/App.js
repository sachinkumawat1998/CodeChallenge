import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { DashboardPage, EditProjectPage } from 'projects/pages';
import { configureStore } from 'core/store';
import { PrivateRoute, RefreshPage } from 'core';
import { AssignmentPage } from './pages';
import Navbar from './Navbar';

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Navbar />
            <Container>
                <Switch>
                    <PrivateRoute path="/dashboard">
                        <DashboardPage />
                    </PrivateRoute>
                    <PrivateRoute path="/projects/:id">
                        <EditProjectPage />
                    </PrivateRoute>
                    <Route path="/login">
                        {/**
                         * The Login page is rendered on the server-side so
                         * we need to refresh the page for that to load
                         * correctly
                         */}
                        <RefreshPage />
                    </Route>
                    <Route path="/">
                        <AssignmentPage />
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
    </Provider>
);

export default App;
