import { withStyles } from "@material-ui/core";
import React from "react";

const styles = () => ({
  rankByLabel: {
    paddingRight: '20px',
    fontSize: '0.75rem',
    fontFamily: 'Inter, sans-serif',
  },
});

const RankBySelect = ({ classes, isLoading, selectedOption, setSelectedOption, options }) => {
  const handleChange = (event) => setSelectedOption(event.target.value);
  
  return (
    <div>
      <label htmlFor="selectOption" className={classes.rankByLabel}>Rank Genes By:</label>
      <select 
        id="selectOption" 
        value={selectedOption} 
        onChange={handleChange} 
        disabled={isLoading}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default withStyles(styles)(RankBySelect);
