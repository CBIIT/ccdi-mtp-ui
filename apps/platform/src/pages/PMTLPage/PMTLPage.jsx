import React, { Component } from 'react';
import {
  Paper,
  Box,
  Typography,
  TextField,
  Link as Lk,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import crossfilter from 'crossfilter2';
import _ from 'lodash';

import BasePageMTP from '../../components/BasePageMTP';
import Link from '../../components/Link';
import DataDownloader from '../../components/DataDownloader';
import PMTLTable from '../../components/PMTLTable';
import RelevantIcon from '../../components/PMTL/RelevantIcon';
import NonRelevantIcon from '../../components/PMTL/NonRelevantIcon';
import UnspecifiedIcon from '../../components/PMTL/UnspecifiedIcon';
import ScrollToTop from '../../components/ScrollToTop';
import ExternalLinkIcon from '../../components/ExternalLinkIcon';
import { mtpPageNames, version} from '../../constants';
import { genericComparator } from '../../utils/comparators'
import config from '../../config';

const { mtpPmtlDocPage } = mtpPageNames;
const PMTL_DATA_URL = `${config.mtpConfig}/data/pmtl_v3.0.json`;

function getColumns(
  targetSymbolOption,
  targetSymbolFilterHandler,
  designationOption,
  designationFilterHandler,
  fdaClassOption,
  fdaClassFilterHandler,
  fdaTargetOption,
  fdaTargetFilterHandler,
  mappingDescriptionOption,
  mappingDescriptionFilterHandler
) {
  const columns = [
    {
      id: 'targetSymbol',
      label: 'Target Symbol',
      style: { width: '170px', maxWidth: '170px', },
      renderCell: row => {
        const ensemblID = row.ensemblID;
        const url = '/target/' + ensemblID;
        return ensemblID !== 'Symbol_Not_Found' ? (
          <Link to={url} external>
            {row.targetSymbol}
          </Link>
        ) : (
          <p> {row.targetSymbol} </p>
        );
      },
      renderFilter: () => (
        <TextField
          label="Search..."
          margin="normal"
          fullWidth
          onChange={(event, newValue) => {
            targetSymbolFilterHandler(event, event.target);
          }}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'targetSymbol'),
    },
    {
      id: 'designation',
      label: 'Designation',
      style: { width: '170px', maxWidth: '170px', },
      renderCell: row => {
        let PMTLIcon = <NonRelevantIcon />;
        if (row.designation === 'Relevant Molecular Target') {
          PMTLIcon = <RelevantIcon />;
        }
        return (
          <p>
            {PMTLIcon} {row.designation}
          </p>
        );
      },
      renderFilter: () => (
        <Autocomplete
          options={designationOption}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={designationFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'designation'),
    },
    {
      id: 'fdaClass',
      label: 'FDA Class',
      style: { width: '150px', maxWidth: '150px', },
      renderFilter: () => (
        <Autocomplete
          options={fdaClassOption}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={fdaClassFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'fdaClass'),
    },
    {
      id: 'fdaTarget',
      label: 'FDA Target',
      style: { width: '400px', maxWidth: '400px', },
      renderFilter: () => (
        <TextField
          fullWidth
          label="Search..."
          margin="normal"
          onChange={(event, newValue) => {
            fdaTargetFilterHandler(event, event.target);
          }}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'fdaTarget'),
    },

    {
      id: 'mappingDescription',
      label: 'Mapping Description',
      style: { width: '200px', maxWidth: '200px', },
      renderFilter: () => (
        <Autocomplete
          options={mappingDescriptionOption}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={mappingDescriptionFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'mappingDescription'),
      tooltip: {
        badgeContent: () => (
          <Lk
            href={`${mtpPmtlDocPage.url}#mapping-description`}
            title="Explanation of 'Mapping Description' column"
          >
            <FontAwesomeIcon icon={faInfoCircle} size="sm" />
          </Lk>
        ),
      },
    },
  ];
  return columns;
}

const downloadColumns = [
  { id: 'ensemblID', label: 'ensemblID' },
  { id: 'targetSymbol', label: 'targetSymbol' },
  { id: 'designation', label: 'designation' },
  { id: 'fdaClass', label: 'fdaClass' },
  { id: 'fdaTarget', label: 'fdaTarget' },
  { id: 'mappingDescription', label: 'mappingDescription' },
];

const getTargetSymbolOptions = rows => {
  return _.uniqBy(rows, 'targetSymbol').map(row => ({
    label: row.targetSymbol,
    value: row.targetSymbol,
  }));
};

const getDesignationOptions = rows => {
  return _.uniqBy(rows, 'designation').map(row => ({
    label: row.designation,
    value: row.designation,
  }));
};

const getFdaClassOptions = rows => {
  return _.uniqBy(rows, 'fdaClass').map(row => ({
    label: row.fdaClass,
    value: row.fdaClass,
  }));
};

const getFdaTargetOptions = rows => {
  return _.uniqBy(rows, 'fdaTarget').map(row => ({
    label: row.fdaTarget,
    value: row.fdaTarget,
  }));
};

const getReformatMethodOptions = rows => {
  return _.uniqBy(rows, 'mappingDescription').map(row => ({
    label: row.mappingDescription,
    value: row.mappingDescription,
  }));
};

class PMTLPage extends Component {
  state = {
    filteredRows: [],
    pageSize: 25,
    loading: true,
    fdaPmtlVersion: "",
  };
  // Generic Function to handle column filtering
  columnFilterHandlerStartsWith = (e, selection, PMTLXf, columnDim) => {
    if (selection) {
      columnDim.filter(d =>
        d.toUpperCase().startsWith(selection.value.toUpperCase())
      );
    } else {
      columnDim.filterAll();
    }

    this.setState({ filteredRows: PMTLXf.allFiltered() });
  };

  // Generic Function to handle column filtering
  columnFilterHandlerParticalMatch = (e, selection, PMTLXf, columnDim) => {
    if (selection) {
      columnDim.filter(
        d =>
          ' '
            .concat(d.toUpperCase())
            .indexOf(' '.concat(selection.value.toUpperCase())) !== -1
      );
    } else {
      columnDim.filterAll();
    }

    this.setState({ filteredRows: PMTLXf.allFiltered() });
  };

  // Generic Function to handle column filtering
  columnFilterHandlerExact = (e, selection, PMTLXf, columnDim) => {
    if (selection) {
      columnDim.filter(d => d === selection.value);
    } else {
      columnDim.filterAll();
    }

    this.setState({ filteredRows: PMTLXf.allFiltered() });
  };

  targetSymbolFilterHandler = (e, selection) => {
    this.columnFilterHandlerStartsWith(
      e,
      selection,
      this.PMTLXf,
      this.targetSymbolDim
    );
  };

  designationFilterHandler = (e, selection) => {
    this.columnFilterHandlerExact(
      e,
      selection,
      this.PMTLXf,
      this.designationDim
    );
  };

  fdaClassFilterHandler = (e, selection) => {
    this.columnFilterHandlerExact(e, selection, this.PMTLXf, this.fdaClassDim);
  };

  fdaTargetFilterHandler = (e, selection) => {
    this.columnFilterHandlerParticalMatch(
      e,
      selection,
      this.PMTLXf,
      this.fdaTargetDim
    );
  };

  mappingDescriptionFilterHandler = (e, selection) => {
    this.columnFilterHandlerExact(
      e,
      selection,
      this.PMTLXf,
      this.mappingDescriptionDim
    );
  };
  
  fetchData(url) {
    return fetch(url).then((res) => res.json());
  };

  componentDidMount() {
    this.fetchData(PMTL_DATA_URL).then((data) => {
      this.setState({ ...this.state, filteredRows: data || [], loading: false});

      this.PMTLXf = crossfilter(data); 
      this.targetSymbolDim = this.PMTLXf.dimension(row => row.targetSymbol);
      this.designationDim = this.PMTLXf.dimension(row => row.designation);
      this.fdaClassDim = this.PMTLXf.dimension(row => row.fdaClass);
      this.fdaTargetDim = this.PMTLXf.dimension(row => row.fdaTarget);
      this.mappingDescriptionDim = this.PMTLXf.dimension(
        row => row.mappingDescription
      );
    })
    .catch(error => {
      this.setState({ ...this.state, filteredRows: [], loading: false});
    });

    this.fetchData(version.versionConfigURL)
    .then(data => this.setState({...this.state, fdaPmtlVersion: data.fdaPmtl.version}))
    .catch(error => this.setState({...this.state, fdaPmtlVersion: ""}));
  };

  handleRowsPerPageChange = newPageSize => {
    this.setState({ pageSize: newPageSize });
  };

  render() {
    // Download Data will be coming from getDownloadRows()
    const { filteredRows, pageSize, loading, fdaPmtlVersion } = this.state;

    const targetSymbolOptions = getTargetSymbolOptions(filteredRows);
    const designationOptions = getDesignationOptions(filteredRows);

    const fdaClassOptions = getFdaClassOptions(filteredRows);
    const fdaTargetOptions = getFdaTargetOptions(filteredRows);
    const mappingDescriptionOptions = getReformatMethodOptions(filteredRows);

    const columns = getColumns(
      targetSymbolOptions,
      this.targetSymbolFilterHandler,
      designationOptions,
      this.designationFilterHandler,
      fdaClassOptions,
      this.fdaClassFilterHandler,
      fdaTargetOptions,
      this.fdaTargetFilterHandler,
      mappingDescriptionOptions,
      this.mappingDescriptionFilterHandler
    );
    const rowsPerPageOptions = [10, 25, 50];
    const FDA_Publication =
      'https://www.fda.gov/about-fda/oncology-center-excellence/pediatric-oncology#target';

    return (
      <BasePageMTP title="FDA Pediatric Molecular Target Lists">
        <ScrollToTop />
        <Typography variant="h4" component="h1" align="center" paragraph>
          US Food & Drug Administration Pediatric Molecular Target Lists (FDA
          PMTL)
        </Typography>
        <br />
        <Typography paragraph>
          <Link to={mtpPmtlDocPage.url}> Version {fdaPmtlVersion} </Link>
        </Typography>
        <hr />
        <br />
        <Typography paragraph>
          Targets in the FDA's Pediatric Molecular Target Lists (PMTL) are
          important for studies of pediatric cancer and have special legal
          requirements associated with drug development. The table below is a
          computable interpretation of the target lists published by the FDA.
          See our{' '}
          <Link to={mtpPmtlDocPage.url}>
            <b>{mtpPmtlDocPage.label}</b>
          </Link>{' '}
          or the official{' '}
          <Link external to={FDA_Publication}>
            <b>FDA publication</b>
            <ExternalLinkIcon />
          </Link>{' '}
          for details.
        </Typography>
        <Typography paragraph>
          Each target in the list is designated as either a <RelevantIcon />{' '}
          <b> Relevant Molecular Target </b> or <NonRelevantIcon />{' '}
          <b> Non-Relevant Molecular Target</b>. Any target not in this list is
          considered an <UnspecifiedIcon /> <b> Unspecified Target</b> by
          default.
        </Typography>
        <br />
        <hr />
        <br />
        <Paper variant="outlined" elevation={0}>
          <Box m={2}>
              <>
                <Lk
                  href={`${mtpPmtlDocPage.url}#colums-description`}
                  title="FDA PMTL Columns Description"
                >
                  <FontAwesomeIcon icon={faInfoCircle} size="md" /> Columns
                  Description
                </Lk>
                <DataDownloader
                  tableHeaders={downloadColumns}
                  rows={filteredRows}
                  fileStem={`pmtl`}
                />
                <PMTLTable
                  filters
                  columns={columns}
                  data={filteredRows}
                  pageSize={pageSize}
                  onRowsPerPageChange={this.handleRowsPerPageChange}
                  rowsPerPageOptions={rowsPerPageOptions}
                  loading={loading}
                />
              </>
          </Box>
        </Paper>
      </BasePageMTP>
    );
  }
}
export default PMTLPage;
