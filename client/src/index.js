import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import history from './history';

import { Provider } from 'react-redux';
//import reducers from './reducers';
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter
            history={history}
        >
            <App 
                history={history}
            />
        </BrowserRouter>
    </Provider>, 
    document.querySelector('#root')
);
registerServiceWorker();
