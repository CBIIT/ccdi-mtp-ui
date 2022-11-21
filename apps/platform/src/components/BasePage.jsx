import React from 'react';
import { Helmet } from 'react-helmet';

import Search from './Search';
import Page from './Page';
import NavBar from './NavBar';
import NCIHeader from './NCIHeader';
import NCIFoooter from './NCIFooter';
import {
  appTitle,
  appDescription,
  appCanonicalUrl,
} from '../constants';

const BasePage = ({ title, children, description, location }) => {
  const composedTitle = `${title ? title + ' | ' : ''} ${appTitle}`;

  return (
    <Page
      header={
        <>
          <NCIHeader />
          <NavBar
            name="Platform"
            search={<Search embedded />}
          />
        </>
      }
      footer={<NCIFoooter />}
    >
      <Helmet title={composedTitle}>
        <meta name="description" content={description || appDescription} />
        <link
          rel="canonical"
          href={appCanonicalUrl + (location?.pathname || '')}
        />
      </Helmet>
      {children}
    </Page>
  );
};

export default BasePage;
