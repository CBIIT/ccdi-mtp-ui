import { React } from 'react';
import { Tab, Tabs, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
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
    marginBottom: '1rem'
  },
})

const PedTabs = ({ value, onChange, tabs, }) => {
  const classes = useStyles();
  return (
    <Tabs
      value={value}
      onChange={onChange}
      className={classes.tabs}
    >
      {tabs.map(({ label, value, disabled, id }) => (
        <Tab 
          key={id}
          value={value}
          label={label}
          disabled={disabled}
          id={id}
        />
      ))}
    </Tabs>
  );
}

export default PedTabs;