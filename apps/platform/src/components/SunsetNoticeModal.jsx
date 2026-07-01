import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    zIndex: `${theme.zIndex.header + 100} !important`,
  },
  paper: {
    borderRadius: 28,
    maxWidth: 750,
    border: `1px solid #368acb`,
  },
  content: {
    fontColor: '#000000',
    padding: `${theme.spacing(6,8)} !important`,
    position: 'relative',
    '& a': {
      color: '#3489ca',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 3),
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: '#6f6f6f',
  },
  title: {
    color: '#368acb',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    fontSize: '1.5rem',
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.75rem',
    },
  },
  paragraph: {
    marginBottom: theme.spacing(4),
    fontSize: '1rem',
    lineHeight: 1.75,
  },
  emphasis: {
    fontWeight: 500,
  },
  list: {
    marginTop: theme.spacing(-1),
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    '& li': {
      marginBottom: theme.spacing(1),
      fontSize: '1rem',
      lineHeight: 1.3,
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
}));

function SunsetNoticeModal({ open, onClose }) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="sunset-notice-title"
      className={classes.dialogRoot}
      hideBackdrop
      PaperProps={{ className: classes.paper }}
    >
      <DialogContent className={classes.content}>
        <IconButton
          aria-label="close sunset notice"
          onClick={onClose}
          className={classes.closeButton}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Typography id="sunset-notice-title" component="h2" className={classes.title}>
          Molecular Targets Platform (MTP)
          <br />
          Sunset Notice
        </Typography>

        <Typography className={classes.paragraph}>
          The Molecular Targets Platform (MTP) will be retired on <span className={classes.emphasis}>July 31, 2026 </span>{' '}
          and will no longer be available after this date.
        </Typography>

        <Typography className={classes.paragraph}>
          <span className={classes.emphasis}>To continue accessing CCDI resources:</span>
        </Typography>

        <ul className={classes.list}>
          <li>Row-level molecular data: Visit the CCDI <a href="https://cbioportal.ccdi.cancer.gov/">cBioPortal</a></li>
          <li>FDA Pediatric Molecular Target Lists (PMTL) content: Visit the <a href="https://ccdi.cancer.gov/">CCDI Hub</a></li>
        </ul>

        <Typography className={classes.paragraph}>
          If you currently use MTP, we&apos;d like to hear from you. Please share your use cases, ongoing
          needs, or feedback by contacting the CCDI mailbox at{' '}
          <span className={classes.emphasis}>
            <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov">
              NCIChildhoodCancerDataInitiative@mail.nih.gov
            </a>
          </span>
          .
          {' '}Your input will help inform future CCDI capabilities and resources.
        </Typography>

        <Typography className={classes.paragraph}>
          Thank you for your support of the Molecular Targets Platform.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

SunsetNoticeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SunsetNoticeModal;