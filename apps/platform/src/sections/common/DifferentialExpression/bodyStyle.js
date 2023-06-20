import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
  tabs: {
    '& .MuiTabs-indicator': {
      color: '#5ca300',
    },
    '& .MuiTab-root.Mui-selected': {
      backgroundColor: '#5ca300',
      color: '#fff',
    },
    '& .MuiTab-textColorInherit': {
      color: '#376100 ',
      '&:hover': { backgroundColor: '#bdda99' },
    },
  },
  image: {
    minWidth: '1200px',
    width: '100%',
    height: 'auto',
  },
  downloaderContainer: {
    justifyContent: 'flex-end',
    border: '0px solid green',
    order: 1,
    [theme.breakpoints.down('xs')]: {
      order: 0,
    },
  },
  selectContainer: {
    '@media (max-width: 600px)': {
      marginBottom: '10px',
    },
    paddingTop: '5px',
    justifyContent: 'flex-start',
    border: '0px solid red',
    order: 0,
    [theme.breakpoints.down('xs')]: {
      order: 1,
    },
  },
  plotContainer: {
    marginTop: '20px',
    overflow: 'auto'
  }
}));

export default styles;