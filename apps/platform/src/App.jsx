import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { ThemeProvider } from 'ui';
import client from './client';
import GLOBAL_QUERY from './GlobalQuery.gql';
// import initLocalStorage from './utils/initLocalStorage';
import theme from './theme';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DiseasePage from './pages/DiseasePage';
import DrugPage from './pages/DrugPage';
import TargetPage from './pages/TargetPage';
import EvidencePage from './pages/EvidencePage';
import APIPage from './pages/APIPage';
import PMTLPage from './pages/PMTLPage';
import PMTLDocPage from './pages/PMTLDocPage/PMTLDocPage';
import AboutPage from './pages/AboutPage';
import ChangeLogPage from './pages/ChangeLogPage';
import PedCancerDataNavPage from './pages/PedCancerDataNavPage';
import NotFoundPage from './pages/NotFoundPage';
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
                <Route exact path="/" component={HomePage} />
                <Route path="/search" component={SearchPage} />
                <Route path="/disease/:efoId" component={DiseasePage} />
                <Route path="/target/:ensgId" component={TargetPage} />
                <Route path="/drug/:chemblId" component={DrugPage} />
                <Route path="/evidence/:ensgId/:efoId" component={EvidencePage} />
                <Route path="/api" component={APIPage} />
                <Route path="/fda-pmtl" component={PMTLPage} />
                <Route path="/mtp-pmtl-docs" component={PMTLDocPage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/change-log" component={ChangeLogPage} />
                <Route path="/pediatric-cancer-data-navigation" component={PedCancerDataNavPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </Router>
          </PlatformApiProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
