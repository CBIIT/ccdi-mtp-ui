import React from 'react';
import { Grid } from '@material-ui/core';
import DataDownloader from '../../../components/Table/DataDownloader';

const PlotContainer = ({ 
  children,
  DDRows,
  DDColumns,
  DDFileStem,
  captionLabel = "Download data as",
  id="",
}) => (
  <Grid container>
    <DataDownloader
      rows={DDRows}
      columns={DDColumns}
      fileStem={DDFileStem}
      captionLabel={captionLabel}
    />
    <Grid item xs={12} style={{ overflow: 'auto' }} id={id}>
      {children}
    </Grid>
  </Grid>
);

export default PlotContainer;