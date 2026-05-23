import React from 'react';
import { ConfigProvider, App as AntdApp, theme } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { store } from 'store/redux-store';
import { apolloClient } from 'query';

type Props = {
  children: React.ReactNode;
};

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <ConfigProvider
            theme={{
              algorithm: theme.defaultAlgorithm,
              token: {
                colorPrimary: '#1f6feb',
                colorSuccess: '#2da44e',
                colorWarning: '#d97706',
                colorInfo: '#1f6feb',
                colorText: '#102542',
                colorTextSecondary: '#5b6b81',
                colorBgBase: '#f4efe6',
                colorBgContainer: '#fffdf8',
                borderRadius: 18,
                fontFamily: `'Segoe UI', 'Trebuchet MS', sans-serif`,
              },
            }}
          >
            <AntdApp>{children}</AntdApp>
          </ConfigProvider>
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  );
};
