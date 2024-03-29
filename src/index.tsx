import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/redux-store'
import { notification } from 'antd';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

notification.config({
    placement: 'topRight',
    duration: 3,
    maxCount: 4
});

root.render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </StrictMode>,
);

reportWebVitals();
