import React from 'react';
import { Grid, makeStyles, Typography, Paper } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import NCIFooter from '../../components/NCIFooter';
import NCIHeader from '../../components/NCIHeader';
import ScrollToTop from '../../components/ScrollToTop';
import Link from '../../components/Link';
import { appDescription, appCanonicalUrl, version, mtpPageNames, mtpLinks } from '../../constants';
import ExternalLinkIcon from '../../components/ExternalLinkIcon';
import usePlatformApi from '../../hooks/usePlatformApi';
import useConfigVersion from '../../hooks/useConfigVersion';

const useStyles = makeStyles(theme => ({
  changeLogContainer: {
    minWidth: '340px',
    backgroundColor: '#EDF1F4',
    color: '#000000',
    fontSize: '16px',
  },
  introContainer: {
    marginTop: theme.header.height,
    padding: `${theme.header.spacing} 40px 68px`,
    '@media (max-width: 360px)': {
      padding: `${theme.header.spacing} 28px 68px`,
    },
  },
  changeLogSubContainer: {
    padding: '55px 40px 0px 40px',
    '@media (max-width: 460px)': {
      padding: '30px 0px 0px 0px',
    },
  },
  changeLogPaper: {
    marginBottom: '8px',
    borderRadius: '8px',
  },
  changeLogBox: {
    display: 'flex',
    border: '1px solid #2188D8',
    borderRadius: '6px',
  },
  changeLogBoxLeft: {
    flex: 1,
    padding: '12px 17px 17px 14px',
  },
  changeLogBoxRight: {
    flex: 1,
    padding: '12px 17px 17px 14px',
    borderLeft: '1px solid #2188D8',
  },
}));

const getVersion = (obj, prefix='') => {
  if (obj?.customVersion) return obj.customVersion;

  const version = obj?.version;
  const releaseDate = obj?.releaseDate;
  return obj && version && releaseDate ? `${prefix + version} (Released ${releaseDate})` : '';
};

const ChangeLogView = ({ data }) => {
  const request = usePlatformApi();
  const configVersion = useConfigVersion();
  const { fdaPmtl, openTargetsPlatform, openPedCanAnalyses, oncoKBCancerGeneList } = configVersion;
  console.log("configVersion", configVersion)
  const classes = useStyles();
  const appTitle = 'Change Log';
  const BEversion = request.loading
    ? 'Loading...'
    : request.data?.meta?.mtpVersion?.version || version.backend;
  const { mtpPmtlDocPage } = mtpPageNames;

  return (
    <>
      <Helmet title={appTitle}>
        <meta name="description" content={appDescription} />
        <link rel="canonical" href={appCanonicalUrl} />
      </Helmet>
      <ScrollToTop />
      <NCIHeader />

      <Grid container justify="center" className={classes.changeLogContainer}>
        <Grid
          item
          xs={12}
          md={8}
          lg={7}
          xl={6}
          className={classes.introContainer}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            paragraph
            className={classes.title}
          >
            Change Log
          </Typography>

          <Typography paragraph>
            The Molecular Targets Platform integrates many different sources of
            data and analyses, all of which are updated at varying intervals. In
            order to comprehensively track changes, the various changelogs are
            aggregated here.
          </Typography>

          <Grid item className={classes.changeLogSubContainer}>
            <Paper className={classes.changeLogPaper}>
              <div className={classes.changeLogBox}>
                <div className={classes.changeLogBoxLeft}>
                  <Typography
                    variant="h6"
                    component="h1"
                    paragraph
                    className={classes.projectTitle}
                  >
                    Open Targets Platform
                  </Typography>
                  <b>Version in use</b>: {getVersion(openTargetsPlatform)} <br />
                  <b>Detailed Change Log</b>:
                  <Link
                    to="https://platform-docs.opentargets.org/release-notes"
                    external
                  >
                    {' '}
                    Open Targets Platform
                    <ExternalLinkIcon />
                  </Link>
                </div>
                <div className={classes.changeLogBoxRight}>
                  The Open Targets Platform version represents the built-in data
                  and functions of the Molecular Targets Platform. This includes
                  all data, displays, and site behavior not otherwise defined in
                  this About page.
                </div>
              </div>
            </Paper>

            <Paper className={classes.changeLogPaper}>
              <div className={classes.changeLogBox}>
                <div className={classes.changeLogBoxLeft}>
                  <Typography
                    variant="h6"
                    component="h1"
                    paragraph
                    className={classes.projectTitle}
                  >
                    Molecular Targets Platform Frontend
                  </Typography>
                  <b>Version in use</b>: {version.frontend} <br />
                  <b>Detailed Change Log</b>:
                  <Link to={version.frontendURL} external>
                    {' '}
                    MTP Frontend Release
                    <ExternalLinkIcon />
                  </Link>
                </div>

                <div className={classes.changeLogBoxRight}>
                  The Molecular Targets Platform Frontend contains all of the
                  visual and user-focused components of the site.
                </div>
              </div>
            </Paper>

            <Paper className={classes.changeLogPaper}>
              <div className={classes.changeLogBox}>
                <div className={classes.changeLogBoxLeft}>
                  <Typography
                    variant="h6"
                    component="h1"
                    paragraph
                    className={classes.projectTitle}
                  >
                    Molecular Targets Platform Backend
                  </Typography>
                  <b>Version in use</b>: {BEversion} <br />
                  <b>Detailed Change Log</b>:
                  <Link to={version.backendURL} external>
                    {' '}
                    MTP Backend Release
                    <ExternalLinkIcon />
                  </Link>
                </div>

                <div className={classes.changeLogBoxRight}>
                  The Molecular Targets Platform Backend contains all of the
                  database and infrastructure components of the site.
                </div>
              </div>
            </Paper>

            <Paper className={classes.changeLogPaper}>
              <div className={classes.changeLogBox}>
                <div className={classes.changeLogBoxLeft}>
                  <Typography
                    variant="h6"
                    component="h1"
                    paragraph
                    className={classes.projectTitle}
                  >
                    OpenPedCan Analyses
                  </Typography>
                  <b>Version in use</b>: {getVersion(openPedCanAnalyses, 'v')} <br />
                  <b>Detailed Change Log</b>:{' '}
                  <Link to={mtpLinks.openPedCan} external>
                    OpenPedCan Analysis Release
                    <ExternalLinkIcon />
                  </Link>
                </div>

                <div className={classes.changeLogBoxRight}>
                  The OpenPedCan version represents new analysis results used in
                  the OpenPedCan Somatic Alterations and Gene Expression
                  displays.
                </div>
              </div>
            </Paper>

            <Paper className={classes.changeLogPaper}>
              <div className={classes.changeLogBox}>
                <div className={classes.changeLogBoxLeft}>
                  <Typography
                    variant="h6"
                    component="h1"
                    paragraph
                    className={classes.projectTitle}
                  >
                    OncoKB Cancer Gene List
                  </Typography>
                  <b>Version in use</b>: {getVersion(oncoKBCancerGeneList, 'v')} <br />
                  <b>Detailed Change Log</b>:
                  <Link to="https://www.oncokb.org/news#07162021" external>
                    {' '}
                    OncoKB Release
                    <ExternalLinkIcon />
                  </Link>
                </div>

                <div className={classes.changeLogBoxRight}>
                  The OncoKB Cancer Gene List version represents the genes
                  identified as OncoKB oncogenes or tumor suppressor genes
                  within the OpenPedCan Somatic Alterations display.
                </div>
              </div>
            </Paper>
            <Paper className={classes.changeLogPaper}>
              <div className={classes.changeLogBox}>
                <div className={classes.changeLogBoxLeft}>
                  <Typography
                    variant="h6"
                    component="h1"
                    paragraph
                    className={classes.projectTitle}
                  >
                    FDA Pediatric Molecular Target Lists
                  </Typography>
                  <b>Version in use</b>: {getVersion(fdaPmtl, 'v')} <br />
                  <b>Detailed Change Log</b>:
                  <Link to={mtpPmtlDocPage.url}> {mtpPmtlDocPage.label} </Link>
                </div>

                <div className={classes.changeLogBoxRight}>
                  The FDA PMTL version represents the computable interpretation
                  of the lists as used within the Molecular Targets Platform.
                  When the FDA publishes new lists, new computable
                  interpretations will be updated here.
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <NCIFooter />
    </>
  );
};

export default ChangeLogView;
