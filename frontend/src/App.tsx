import React from 'react';
import { Router } from "react-router-dom";
import Routes from "./Route";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/core/styles";
import configureStore from './redux';
import theme from "./styles/theme";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

const browserHistory = createBrowserHistory();
function App() {

  const { store, persistor } = configureStore();
  return (

    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
