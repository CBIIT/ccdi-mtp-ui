import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { ThemeProvider } from 'ui';
import client from './client';
import GLOBAL_QUERY from './GlobalQuery.gql';
// import initLocalStorage from './utils/initLocalStorage';
import theme from './theme';
import MaintenancePage from './pages/MaintenancePage';
import PlatformApiProvider from './contexts/PlatformApiProvider';

class App extends Component {
  componentDidMount() {
    // initLocalStorage();
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <PlatformApiProvider query={GLOBAL_QUERY}>
            <Router>
              <Switch>
                <Route component={MaintenancePage} />
              </Switch>
            </Router>
          </PlatformApiProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
