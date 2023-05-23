import React from 'react';
import { Grid } from '@material-ui/core';
import DataDownloader from '../../../components/Table/DataDownloader';

const PlotContainer = ({ 
  children,
  DDRows,
  DDColumns,
  DDFileStem,
  downloadBtnLabel = 'Download data as',
  id="",
}) => (
  <Grid container>
    <DataDownloader
      rows={DDRows}
      columns={DDColumns}
      fileStem={DDFileStem}
      downloadBtnLabel={downloadBtnLabel}
    />
    <Grid item xs={12} style={{ overflow: 'auto' }} id={id}>
      {children}
    </Grid>
  </Grid>
);

export default PlotContainer;