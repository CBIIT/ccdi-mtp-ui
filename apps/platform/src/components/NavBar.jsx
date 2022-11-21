import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import OpenTargetsTitle from './OpenTargetsTitle';

const styles = theme => ({
  navbar: {
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    width: '100%',
    zIndex: theme.zIndex.navbar,
    top: theme.header.height,
  },
  flex: {
    flexGrow: 1,
  },
});

const NavBar = ({
  classes,
  name,
  search,
}) => {
  return (
    <AppBar
      className={classNames(classes.navbar)}
      position="fixed"
      color="primary"
      elevation={0}
    >
      <Toolbar variant="dense">
        <Button component={ReactRouterLink} to="/" color="inherit">
          <OpenTargetsTitle name={name} />
        </Button>
        <div className={classes.flex} />
        {search ? search : null}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(NavBar);
