import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Hidden,
} from '@material-ui/core';
import { Helmet } from 'react-helmet';

import {
  appTitle,
  appDescription,
  appCanonicalUrl,
} from '../../constants';
import HomeBox from './MTPHomeBox';
import Link from '../../components/Link';
import Search from '../../components/Search';
import searchExamples from './searchExamples';
import Splash from './Splash';
import Version from './Version';

import PrivateWrapper from '../../components/PrivateWrapper';
import ScrollToTop from '../../components/ScrollToTop';
import NCIHeader from '../../components/NCIHeader';
import NCIFooter from '../../components/NCIFooter';
import ExternalLinkIcon from '../../components/ExternalLinkIcon';

const useStyles = makeStyles(theme => ({
  links: {
    marginTop: '12px',
  },
  hpSection: {
    minHeight: '686px',
  },
  singleColumn: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
  aboutBox: {
    margin: '59px 0 69px 0',
  },
}));

function pickTwo(arr) {
  let i1 = Math.floor(Math.random() * arr.length);
  let i2 = Math.floor(Math.random() * arr.length);

  while (i1 === i2) {
    i2 = Math.floor(Math.random() * arr.length);
  }

  return [arr[i1], arr[i2]];
}

const HomePage = () => {
  const classes = useStyles();
  const targets = pickTwo(searchExamples.targets);
  const diseases = pickTwo(searchExamples.diseases);
  const drugs = pickTwo(searchExamples.drugs);

  return (
    <>
      <Helmet title={appTitle}>
        <meta name="description" content={appDescription} />
        <link rel="canonical" href={appCanonicalUrl} />
      </Helmet>
      <ScrollToTop />
      <NCIHeader />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.hpSection}
      >
        <Splash />
        <HomeBox>
          <Search autoFocus />
          {/* Search examples */}
          <Grid
            className={classes.links}
            container
            justifyContent="space-around"
          >
            <Link
              to={`/target/${targets[0].id}/associations`}
              className={classes.singleColumn}
            >
              {targets[0].label}
            </Link>
            <Hidden smDown>
              <Link to={`/target/${targets[1].id}/associations`}>
                {targets[1].label}
              </Link>
            </Hidden>

            <Link
              to={`/disease/${diseases[0].id}/associations`}
              className={classes.singleColumn}
            >
              {diseases[0].label}
            </Link>
            <Hidden smDown>
              <Link to={`/disease/${diseases[1].id}/associations`}>
                {diseases[1].label}
              </Link>
            </Hidden>

            <Link to={`/drug/${drugs[0].id}`} className={classes.singleColumn}>
              {drugs[0].label}
            </Link>
            <Hidden smDown>
              <Link to={`/drug/${drugs[1].id}`}>{drugs[1].label}</Link>
            </Hidden>
          </Grid>
          <Version />
          <PrivateWrapper>
            <div className={classes.dataPolicy}>
              <Typography
                variant="body2"
                display="block"
                align="center"
                gutterBottom
              >
                The Open Targets Partner Preview Platform is provided
                exclusively to Open Targets consortium members. All data and
                results of queries must remain confidential and must not be
                shared publicly.
              </Typography>
              <Typography
                variant="body2"
                display="block"
                align="center"
                gutterBottom
              >
                <strong>
                  <Link
                    external
                    newTab
                    to="http://home.opentargets.org/partner-preview-platform-data-policy"
                  >
                    View our data policy
                  </Link>
                </strong>
              </Typography>
            </div>
          </PrivateWrapper>
        </HomeBox>
      </Grid>

      {/* About */}
      <Grid container justify="center" className={classes.aboutBox}>
        <Grid item xs={10} md={8}>
          <Typography variant="h4" component="h1" align="center" paragraph>
            The Molecular Targets Platform
          </Typography>

          <Typography paragraph align="center">
            The Molecular Targets Platform is an NCI-supported instance of the
            <Link to={'https://platform.opentargets.org/'} external>
              {' '}
              Open Targets Platform
              <ExternalLinkIcon />
            </Link>{' '}
            with a focus on preclinical pediatric oncology data. It is a tool
            that supports the identification and prioritization of molecular
            targets expressed in childhood cancers.
          </Typography>
        </Grid>
      </Grid>

      {/* remove for integration day  */}
      {/* <Stats /> */}
      <NCIFooter />
    </>
  );
};

export default HomePage;
