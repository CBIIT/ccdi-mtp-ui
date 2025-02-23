import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import PlotContainer from './PlotContainer';
import PlotContainerSection from './PlotContainerSection';

const PAGE_SIZE = 10;

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
  },
});

class TablePaginationActions extends Component {
  handleFirstPageButtonClick = event => {
    this.props.onPageChange(event, 0);
  };

  handleBackButtonClick = event => {
    const { onPageChange, page } = this.props;
    onPageChange(event, page - 1);
  };

  handleNextButtonClick = event => {
    const { onPageChange, page } = this.props;
    onPageChange(event, page + 1);
  };

  handleLastPageButtonClick = event => {
    const { onPageChange, count, rowsPerPage } = this.props;
    const lastPage = Math.ceil(count / rowsPerPage) - 1;
    onPageChange(event, lastPage);
  };

  render() {
    const { count, page, rowsPerPage, classes } = this.props;
    const lastPage = Math.ceil(count / rowsPerPage) - 1;
    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= lastPage}
          aria-label="Next Page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= lastPage}
          aria-label="Last Page"
        >
          <LastPageIcon />
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions = withStyles(actionsStyles)(TablePaginationActions);

const getComparator = (columns, sortBy, order) => {
  const column = columns.find(col => col.id === sortBy);

  if (column && column.comparator) {
    if (order === 'asc') {
      return column.comparator;
    }
    return (a, b) => -column.comparator(a, b);
  }

  const comparatorValue = order === 'desc' ? 1 : -1;

  return (a, b) => {
    if (a[sortBy] === b[sortBy]) {
      return 0;
    }

    if (a[sortBy] === undefined || a[sortBy] === '' || a[sortBy] < b[sortBy]) {
      return comparatorValue;
    }

    if (b[sortBy] === undefined || b[sortBy] === '' || a[sortBy] > b[sortBy]) {
      return -comparatorValue;
    }
  };
};

const tableStyles = theme => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  tooltipIcon: {
    fontSize: '1.2rem',
    paddingLeft: `0.6rem`,
  },
  buttonMargin: {
    marginRight: '4px',
  },
  tableRow: {
    height: '31px',
  },
  tableRowFixed: {
    background: theme.palette.grey[300],
  },
  tableRowFilters: {
    verticalAlign: 'bottom',
  },
  tableCell: {
    padding: '0 12px 0 0',
    '&:first-child': {
      paddingLeft: '24px',
    },
    '&:last-child': {
      paddingRight: '24px',
    },
  },
  tableCellHeader: {
    paddingRight: '12px',
    paddingLeft: 0,
    '&:first-child': {
      paddingLeft: '24px',
    },
    '&:last-child': {
      paddingRight: '24px',
    },
  },
  tableCellSpanHeader: {
    borderLeft: '1px solid #E0E0E0',
    paddingLeft: '5px',
    '&:first-child': {
      borderLeft: 'none',
    },
  },
  tableCellHeaderVertical: {
    textAlign: 'center',
    verticalAlign: 'bottom',
  },
  tableCellVertical: {
    minWidth: '24px',
    width: '24px',
    paddingRight: 0,
  },
  tableCellFill: {
    width: '100%',
  },
  verticalHeader: {
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    whiteSpace: 'nowrap',
  },
  downloadHeader: {
    marginTop: '7px',
  },
  hr: {
    backgorund: theme.palette.grey[300],
  },
});

class PMTLTable extends Component {
  state = {
    page: 0,
    sortBy: this.props.sortBy,
    order: this.props.order,
  };

  handleChangePage = (event, page) => {
    const { onPageSort, pageSize } = this.props;
    window.scrollTo(0, document.getElementById('mtp-table').offsetTop - 300);
    this.setState({ page });
    if (onPageSort) {
      onPageSort({ page: page, pageSize: pageSize });
    }
  };

  selectSortColumn = sortBy => {
    const { reportTableSortEvent, onPageSort } = this.props;
    let order = 'desc';

    if (this.state.sortBy === sortBy && this.state.order === 'desc') {
      order = 'asc';
    }

    if (reportTableSortEvent) {
      reportTableSortEvent(sortBy, order);
    }

    if (onPageSort) {
      onPageSort({ sortBy: sortBy, order: order });
    }
    this.setState({ sortBy, order });
  };

  /*
  * Callback fun that is fired when the number of rows per page is changed.
  * If statement is needed, Sense some of the Existing code or futute that use RMTLTable do
    not have the Rows per page options and do not provide onRowsPerPageChange as props.
  * Change the rows per page and set back the page to 0.
  */
  handleChangeRowsPerPage = event => {
    const { onRowsPerPageChange } = this.props;
    if (onRowsPerPageChange) {
      onRowsPerPageChange(event.target.value);
      this.setState({ page: 0 });
    }
  };
  componentDidUpdate(prevProps) {
    // Reset to the first page if data is updated.
    if (prevProps.data !== this.props.data) {
      this.setState({ page: 0 });
    }
  }

  render() {
    const {
      loading,
      error,
      columns,
      data,
      columnsFixed,
      dataFixed,
      verticalHeaders,
      classes,
      left,
      center,
      message,
      filters,
      pageSize,
      headerGroups,
      tableRowComponent,
      serverSide,
      totalRowsCount,
      rowsPerPageOptions = [], // Added this prop and gave option [] for existing component that do not have functionality to change the amount of row per page
      paginationPosition = 'BOTTOM',
    } = this.props;
    const { sortBy, order, page } = this.state;
    const filterRow = filters ? (
      <TableRow className={classes.tableRowFilters}>
        {columns.map(column => (
          <TableCell key={column.id} className={classes.tableCellHeader}>
            {column.renderFilter ? column.renderFilter() : null}
          </TableCell>
        ))}
      </TableRow>
    ) : null;

    const displayOrderable = column => {
      if (column.orderable !== false) {
        return (
          <TableSortLabel
            active={column.id === sortBy}
            direction={order}
            onClick={this.selectSortColumn.bind(null, column.id)}
            className={column.verticalHeader ? classes.verticalHeader : null}
          >
            {column.label}
          </TableSortLabel>
        );
      }
      return column.label;
    };
    return (
      <PlotContainer
        loading={loading}
        error={error}
        left={left}
        center={center}
      >
        {message ? (
          <PlotContainerSection>
            <div align="center">
              <Typography variant="subtitle1">{message}</Typography>
            </div>
          </PlotContainerSection>
        ) : null}
        <PlotContainerSection>
          {paginationPosition === 'TOP' ? (
            <div id="mtp-table">
              <TablePagination
                component="div"
                count={serverSide ? totalRowsCount : data.length}
                onPageChange={this.handleChangePage}
                page={page}
                rowsPerPage={pageSize}
                rowsPerPageOptions={rowsPerPageOptions} // CHANGE MADE; Previously was rowsPerPageOptions={[]}
                ActionsComponent={TablePaginationActions}
                onChangeRowsPerPage={this.handleChangeRowsPerPage} // CHANGE MADE; Previously did not exist
              />
              <hr className={classes.hr} />
            </div>
          ) : null}
          <div id="mtp-table" className={classes.tableWrapper}>
            <Table>
              <TableHead>
                {headerGroups ? (
                  <TableRow>
                    {headerGroups.map((g, i) => (
                      <TableCell
                        colSpan={g.colspan}
                        key={i}
                        className={classNames(
                          classes.tableCellHeader,
                          classes.tableCellSpanHeader
                        )}
                      >
                        {g.label}
                      </TableCell>
                    ))}
                  </TableRow>
                ) : null}
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      className={classNames(classes.tableCellHeader, {
                        [classes.tableCellHeaderVertical]:
                          column.verticalHeader,
                        [classes.tableCellVertical]: column.verticalHeader,
                      })}
                      style={column.style}
                    >
                      {column.tooltip ? (
                        <Badge
                          badgeContent={column.tooltip.badgeContent()}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                        >
                          {displayOrderable(column)}
                        </Badge>
                      ) : (
                        displayOrderable(column)
                      )}
                    </TableCell>
                  ))}
                  {verticalHeaders ? (
                    <TableCell className={classes.tableCellFill} />
                  ) : null}
                </TableRow>
                {filterRow}
              </TableHead>
              <TableBody>
                {columnsFixed && dataFixed
                  ? dataFixed.map((row, index) => (
                      <TableRow
                        key={index}
                        className={classNames(
                          classes.tableRow,
                          classes.tableRowFixed
                        )}
                        component={tableRowComponent}
                        data={row}
                      >
                        {columnsFixed.map(column => (
                          <TableCell
                            key={column.id}
                            className={classNames(classes.tableCell, {
                              [classes.tableCellVertical]:
                                column.verticalHeader,
                            })}
                          >
                            {column.renderCell
                              ? column.renderCell(row)
                              : row[column.id]}
                          </TableCell>
                        ))}
                        {verticalHeaders ? (
                          <TableCell className={classes.tableCellFill} />
                        ) : null}
                      </TableRow>
                    ))
                  : null}
                {data
                  .slice()
                  .sort(getComparator(columns, sortBy, order))
                  .slice(
                    (serverSide ? 0 : page) * pageSize,
                    (serverSide ? 0 : page) * pageSize + pageSize
                  )
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      className={classes.tableRow}
                      component={tableRowComponent}
                      data={row}
                    >
                      {columns.map(column => (
                        <TableCell
                          key={column.id}
                          className={classNames(classes.tableCell, {
                            [classes.tableCellVertical]: column.verticalHeader,
                          })}
                          style={column.style}
                        >
                          {column.renderCell
                            ? column.renderCell(row)
                            : row[column.id]}
                        </TableCell>
                      ))}
                      {verticalHeaders ? (
                        <TableCell className={classes.tableCellFill} />
                      ) : null}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          {!loading && data.length === 0 ? (
            <PlotContainerSection>
              <div align="center">
                <Typography variant="subtitle1">(no data)</Typography>
              </div>
            </PlotContainerSection>
          ) : null}
          <TablePagination
            component="div"
            count={serverSide ? totalRowsCount : data.length}
            onPageChange={this.handleChangePage}
            page={page}
            rowsPerPage={pageSize}
            rowsPerPageOptions={rowsPerPageOptions} // CHANGE MADE; Previously was rowsPerPageOptions={[]}
            ActionsComponent={TablePaginationActions}
            onChangeRowsPerPage={this.handleChangeRowsPerPage} // CHANGE MADE; Previously did not exist
          />
        </PlotContainerSection>
      </PlotContainer>
    );
  }
}

PMTLTable.defaultProps = {
  pageSize: PAGE_SIZE,
};

export default withStyles(tableStyles)(PMTLTable);
