import React from 'react';
import MainNavigation from './Navigation/MainNavigation';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';
import { persistStore } from 'redux-persist';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <MainNavigation />
      </Provider>
    );
  }
}
