import { withStyles } from "@material-ui/core";
import React from "react";

const styles = () => ({
  container: {
    marginBottom: '2px',
  },
  downloadHeader: {
    marginTop: '7px',
    paddingRight: '20px',
    fontSize: '0.75rem',
    fontFamily: 'Inter, sans-serif',
  },
  'ml-1': {
    'margin-left': '1em',
  },
});

const Select = ({ classes, isLoading, selectedOption, setSelectedOption, options }) => {
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value)
  }
  return (
    <div>
      <label  htmlFor="selectOption" className={classes.downloadHeader}>Rank Genes By:</label>
      <select id="selectOption" value={selectedOption} onChange={handleSelectChange} disabled={isLoading} style={{}}>
        <option value="">-- Rank Genes By--</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default withStyles(styles)(Select);

