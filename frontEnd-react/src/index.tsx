import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter, Switch, Route, Router} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';
import history from './pages/history';
import Helmet from 'react-helmet';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Header}         from  './components/header/header';
import {Tweets}         from  './pages/tweets';
import {TweetDetails}   from  './pages/tweet_details';
import {SignIn}         from  './pages/sign_in';
import {SignUp}         from  './pages/sign_up';
import {UserDetails}    from  './pages/user_details';


ReactDOM.render(
    // <BrowserRouter>
    <Router history={history}>
        <div>
            <Helmet bodyAttributes={{style: 'background-color : #dfe0e6'}}/>
            <Header/>
            <Switch>
                <Route exact path="/"                     component={Tweets}/>
                <Route exact path="/tweet_details/:id"    component={TweetDetails}/>
                <Route exact path="/sign_in"              component={SignIn}/>
                <Route exact path="/sign_up"              component={SignUp}/>
                <Route exact path="/user_details/:userId" component={UserDetails}/>
            </Switch>
        </div>
    </Router>,
    // </BrowserRouter>,
    document.getElementById('root')
);


serviceWorker.unregister();