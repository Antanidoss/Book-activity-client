import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { notification } from 'antd';
import { AppProviders } from './app/providers/AppProviders';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

notification.config({
  placement: 'topRight',
  duration: 3,
  maxCount: 4,
});

root.render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
