import React from 'react';
import { withStyles } from '@material-ui/core';
import NCILogoBar from '../NCILogoBar';
import NCINavBar from '../NCINavBar';
import ShutdownBanner from '../ShutdownBanner';

const styles = (theme) => ({
  headerBar: {
    color: '#8A95A7',
    width: '100%',
    margin: '0 auto',
    minHeight: '100px',
    justifyContent: 'space-between',
    background: '#ffffff',
    position: 'fixed',
    zIndex: theme.zIndex.header,
  },
});

const NCIHeader = ({ classes, ...props }) => {
  return (
    <div id="header" className={classes.headerBar}>
      <ShutdownBanner />
      <NCILogoBar />
      <NCINavBar />
    </div>
  );
};

export default withStyles(styles)(NCIHeader);
