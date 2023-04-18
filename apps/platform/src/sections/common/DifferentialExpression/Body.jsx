import React, { useEffect, useState } from 'react';
import { Tab, Tabs, makeStyles } from '@material-ui/core';
import { Buffer } from 'buffer';
import SectionItem from '../../../components/Section/SectionItem';
import useColumnConfiguration from '../../../hooks/useColumnConfiguration';
import DisplayPlot from './Image';
import PlotContainer from './PlotContainer';

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
  console.log("|| label: ", label)
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
    const rankGenesBy = 'cgc_all_gene_up_and_down_reg_rank';
    getData({ id, rankGenesBy, setData: setGtexDiffExpJson, setHasData: setGtexDiffExpHasData });
  }, [getData, id]);


  useEffect(
    () => {
      // By Default rank genes By cgc_all_gene_up_and_down_reg_rank
      const rankGenesBy = 'cgc_all_gene_up_and_down_reg_rank';
      
      if (gtexDiffExpHasData && tab === 'nonBatchCorrected' && gtexDiffExpLinearPlot.length === 0) {
        /********     Get GTEx Diff Exp Log10 Plot    ******** */
        const includeBoxplot = true;
        const boxplotYAxisScale = 'log10';
        const callback = resData => handlePlotData(resData, setGtexDiffExpLinearPlot);
        setLoading(true);
        getPlot({ id, rankGenesBy, includeBoxplot, boxplotYAxisScale, callback, errorHandler: handleError });
      }
      if (gtexDiffExpHasData && tab === 'WithoutGeBoxPlots' && gtexDiffExpNoGeBoxPlot.length === 0) {
        /********     Get GTEx Diff Exp Log10 Plot    ******** */
        const includeBoxplot = false;
        const boxplotYAxisScale = 'log10';
        const callback = resData => handlePlotData(resData, setGtexDiffExpNoGeBoxPlot);
        setLoading(true);
        getPlot({ id, rankGenesBy, includeBoxplot, boxplotYAxisScale, callback, errorHandler: handleError });
      }
    },
    [getPlot, gtexDiffExpHasData, gtexDiffExpLinearPlot, gtexDiffExpNoGeBoxPlot, id, tab]
  );

  /* Get GTEx DIff Exp Download Column */
  const gtexDiffExpConfigAPI = `${configAPI}/NonBatchCorrected_Config.json`
  const [configDataDownloaderColumns] = useColumnConfiguration(gtexDiffExpConfigAPI, true);
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
        console.log("|| data: ", data)
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
              <PlotContainer
                DDRows={gtexDiffExpJson}
                DDColumns={configDataDownloaderColumns || {}}
                DDFileStem={fileStem}
              >
                <DisplayPlot
                  imageSrc={gtexDiffExpLinearPlot}
                  imageAlt={`${imageAlt}`}
                  classes={classes.image} />
              </PlotContainer>)
            : null}

            { gtexDiffExpHasData && tab === 'WithoutGeBoxPlots' ? (
              <PlotContainer
                DDRows={gtexDiffExpJson}
                DDColumns={configDataDownloaderColumns || {}}
                DDFileStem={fileStem}
              >
                <DisplayPlot
                  imageSrc={gtexDiffExpNoGeBoxPlot}
                  imageAlt={`${imageAlt}`}
                  classes={classes.image} />
              </PlotContainer>
              ) : null}
          </>
        );
      }}
    />
  );
}

export default Body;
