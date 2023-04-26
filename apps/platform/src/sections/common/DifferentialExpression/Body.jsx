import React, { useEffect, useRef, useState, Fragment } from 'react';
import { Grid, Tab, Tabs, makeStyles } from '@material-ui/core';
import { Buffer } from 'buffer';
import SectionItem from '../../../components/Section/SectionItem';
import useColumnConfiguration from '../../../hooks/useColumnConfiguration';
import DisplayPlot from './Image';
import PlotContainer from './PlotContainer';
import Select from '../../../components/Select';
import DataDownloader from '../../../components/Table/DataDownloader';

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
  },
  image: {
    minWidth: '1200px',
    width: '100%',
    height: 'auto',
  },
});

function Body({
  definition,
  id,
  label,
  entity,
  Description,
  configAPI,
  fileStem,
  getPlot,
  getData,
  imageAlt,
}) {
  const [selectedOption, setSelectedOption] = useState("cgc_all_gene_up_and_down_reg_rank");

  const [gtexDiffExpJson, setGtexDiffExpJson] = useState([]);
  const [gtexDiffExpLinearPlot, setGtexDiffExpLinearPlot] = useState('');
  const [gtexDiffExpNoGeBoxPlot, setGtexDiffExpNoGeBoxPlot] = useState('');
  const [gtexDiffExpHasData, setGtexDiffExpHasData] = useState(false);

  const [tab, setTab] = useState('nonBatchCorrected');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const classes = useStyles();
  
  const handlePlotData = (resData, setPlot) => {
    const base64 = Buffer.from(resData).toString('base64');
    const imageSrc = base64;
    setPlot(imageSrc);
    setLoading(false);
  }
  const handleError = (error) => {
    setLoading(false);
    setError(true);
    console.log("Differential Expression widget: ", error);
  }

  const handleOnChange = (_, tab) => {
    return setTab(tab);
  };
  useEffect(() => {
        /********     Get GTEx Diff Exp JSON Data    ******** */
    const rankGenesBy = selectedOption;
    getData({ id, rankGenesBy, setData: setGtexDiffExpJson, setHasData: setGtexDiffExpHasData });
  }, [getData, selectedOption, id]);


  useEffect(
    () => {
      const boxplotYAxisScale = 'log10';
      const rankGenesBy = selectedOption;

      if (gtexDiffExpHasData && tab === 'nonBatchCorrected') {
        /********     Get GTEx Diff Exp Log10 Plot    ******** */
        const includeBoxplot = true;
        const callback = resData => handlePlotData(resData, setGtexDiffExpLinearPlot);
        setLoading(true);
        getPlot({ id, rankGenesBy, includeBoxplot, boxplotYAxisScale, callback, errorHandler: handleError });
      }
      if (gtexDiffExpHasData && tab === 'WithoutGeBoxPlots') {
        /********     Get GTEx Diff Exp Log10 Plot    ******** */
        const includeBoxplot = false;
        const callback = resData => handlePlotData(resData, setGtexDiffExpNoGeBoxPlot);
        setLoading(true);
        getPlot({ id, rankGenesBy, includeBoxplot, boxplotYAxisScale, callback, errorHandler: handleError });
      }
    },
    [getPlot, selectedOption, gtexDiffExpHasData, gtexDiffExpLinearPlot, gtexDiffExpNoGeBoxPlot, id, tab]
  );

  /* Get GTEx DIff Exp Download Column */
  const gtexDiffExpConfigAPI = `${configAPI}/NonBatchCorrected_Config.json`
  const [configDataDownloaderColumns] = useColumnConfiguration(gtexDiffExpConfigAPI, true);
  
  const options = [
    { value: "cgc_all_gene_up_reg_rank", label: "Top up-regulated genes" },
    { value: "cgc_all_gene_down_reg_rank", label: "Top down-regulated genes" },
    { value: "cgc_all_gene_up_and_down_reg_rank", label: "Top differentially expressed genes" },
    { value: "cgc_pmtl_gene_up_reg_rank", label: "Top up-regulated PMTL genes" },
    { value: "cgc_pmtl_gene_down_reg_rank", label: "Top down-regulated PMTL genes" },
    { value: "cgc_pmtl_gene_up_and_down_reg_rank", label: "Top differentially expressed PMTL genes" }
  ];
  const displaySelectAndDownload = ({ gtexDiffExpJson }) => {
    return (
      <Fragment>
        <Grid item xs={6} style={{justifyContent:"flex-start", border: '1px solid green', paddingTop:'5px'}}>
        { entity === 'disease' ?
          <Select isloading={loading} selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={options} />
          : null}
        </Grid>
        <Grid item xs={6} style={{justifyContent:"flex-end", border: '1px solid green'}}>
          <DataDownloader
              rows={gtexDiffExpJson}
              columns={configDataDownloaderColumns}
              fileStem={fileStem}
              downloadBtnLabel='Download data as'
            />
        </Grid>
      </Fragment>
    )
  }

  return (
    <SectionItem
      definition={definition}
      request={{
        data: { gtexDiffExpJson, gtexDiffExpLinearPlot, },
        error,
        loading,
      }}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={data => {
        const {
          gtexDiffExpJson, gtexDiffExpLinearPlot
        } = data;
        return (
          <>
            <Tabs
              value={tab}
              onChange={handleOnChange}
              style={{ marginBottom: '1rem' }}
              className={classes.tabs}
            >
              {/*TODO: Disable a tab when there is no data/plot to show */}
              <Tab
                value="nonBatchCorrected"
                label="Non-Batch Corrected" 
                disabled={!gtexDiffExpHasData}
                />
              <Tab
                value="WithoutGeBoxPlots"
                label="Without GE Box Plots" 
                disabled={!gtexDiffExpHasData}
              />
            </Tabs>
            {/* GTEx - Linear */}
            { gtexDiffExpHasData && tab === 'nonBatchCorrected' ? (
              <Grid container style={{border: '0px solid black'}}>
                {displaySelectAndDownload({ gtexDiffExpJson })}
                <Grid item xs={12} style={{ overflow: 'auto' }} id={id}>
                  <DisplayPlot
                    imageSrc={gtexDiffExpLinearPlot}
                    imageAlt={`${imageAlt}`}
                    classes={classes.image} />
                </Grid>
              </Grid>)
            : null}
            { gtexDiffExpHasData && tab === 'WithoutGeBoxPlots' ? (
              <Grid container style={{border: '0px solid black'}}>
                {displaySelectAndDownload({ gtexDiffExpJson })}
                <Grid item xs={12} style={{ overflow: 'auto' }} id={id}>
                  <DisplayPlot
                    imageSrc={gtexDiffExpNoGeBoxPlot}
                    imageAlt={`${imageAlt}`}
                    classes={classes.image} />
                </Grid>
              </Grid>)
            : null }
          </>
        );
      }}
    />
  );
}

export default Body;
