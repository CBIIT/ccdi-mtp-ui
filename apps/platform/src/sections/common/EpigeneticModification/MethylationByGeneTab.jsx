import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';

function MethylationByGeneTab({
  data,
  BODY_QUERY,
  variables,
  dataDownloaderFileStem,
  configColumns,
  configDataDownloaderColumns,
}) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <DataTable
          id="epigeneticModificationMethylationByGeneTable"
          dataDownloader
          showGlobalFilter
          stickyHeader
          rows={data}
          columns={configColumns}
          dataDownloaderColumns={configDataDownloaderColumns}
          dataDownloaderFileStem={dataDownloaderFileStem}
          query={BODY_QUERY.loc.source.body}
          variables={variables}
          rowsPerPageOptions={defaultRowsPerPageOptions}
          noWrapHeader={false}
          order="asc"
          noWrap={false}
        />
      </Grid>
    </Grid>
  );
}

export default MethylationByGeneTab;
