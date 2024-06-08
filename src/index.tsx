import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/redux-store'
import { notification } from 'antd';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'query';

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
                <ApolloProvider client={apolloClient}>
                    <App />
                </ApolloProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
);

reportWebVitals();
