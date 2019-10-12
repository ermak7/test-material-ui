import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { default as store } from './reducers/store';


let str = store();
window.store = str;

ReactDOM.render(<Provider store={str.store}>
    <PersistGate loading={null} persistor={str.persistor}>
        <Router>
            <Switch>
                <Route path="/*" component={App}/>
            </Switch>
        </Router>
    </PersistGate>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
