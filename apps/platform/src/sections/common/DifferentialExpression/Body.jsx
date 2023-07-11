import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
// import { Buffer } from 'buffer';
import SectionItem from '../../../components/Section/SectionItem';
import useColumnConfiguration from '../../../hooks/useColumnConfiguration';
import DisplayPlot from './Image';
import RankBySelect from './RankBySelect';
import DataDownloader from '../../../components/Table/DataDownloader';
import styles from './bodyStyle';
import PedTabs from '../../../components/PedTabs';

const rankOptions = [
  { value: "cgc_all_gene_up_reg_rank", label: "Top up-regulated genes" },
  { value: "cgc_all_gene_down_reg_rank", label: "Top down-regulated genes" },
  { value: "cgc_all_gene_up_and_down_reg_rank", label: "Top differentially expressed genes" },
  { value: "cgc_pmtl_gene_up_reg_rank", label: "Top up-regulated PMTL genes" },
  { value: "cgc_pmtl_gene_down_reg_rank", label: "Top down-regulated PMTL genes" },
  { value: "cgc_pmtl_gene_up_and_down_reg_rank", label: "Top differentially expressed PMTL genes" }
];

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
  const [plotData, setPlotData] = useState({});
  const [gtexDiffExpHasData, setGtexDiffExpHasData] = useState(false);
  const [tab, setTab] = useState('nonBatchCorrected');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const handleTabChange = (_, tab) => setTab(tab);
  const classes = styles();

  useEffect(() => {
    /********     Get GTEx Diff Exp JSON Data    ******** */
    const rankGenesBy = selectedOption;
    getData({ id, rankGenesBy, setData: setGtexDiffExpJson, setHasData: setGtexDiffExpHasData });
  }, [getData, selectedOption, id]);

  useEffect(() => {
    // Define the plot options based on the selected tab
    const plotOptions = {
      'nonBatchCorrected': { includeBoxplot: true },
      'withoutGeBoxPlots': { includeBoxplot: false },
    };
    // Check if GTEx Diff Exp data is available
    if (gtexDiffExpHasData) {
      // Extract the plot options based on the selected tab
      const { includeBoxplot } = plotOptions[tab];
      const boxplotYAxisScale = 'log10';
      const rankGenesBy = selectedOption;

      const callback = (resData) => {
        // Convert the plot data to base64-encoded image source
        /*const base64 = Buffer.from(resData).toString('base64');
        const imageSrc = base64;*/
        const imageSrc = resData;
        // Update the plotData object with the new plot image source
        setPlotData(data => ({ ...data, [selectedOption]: { ...data[selectedOption], [tab]: imageSrc } }));
        setLoading(false);
      };

      const errorHandler = error => {
        setLoading(false);
        setError(true);
        console.log("Differential Expression widget: ", error);
      };

      // Check if plot data is already available
      if (!plotData[selectedOption]?.[tab]) {
        // Fetch the plot data using the getPlot function
        setLoading(true);
        getPlot({ id, rankGenesBy, includeBoxplot, boxplotYAxisScale, callback, errorHandler });
      } else {
        // Set the loading state to false if the plot data is already available
        setLoading(false);
      }
    }
  }, [getPlot, selectedOption, gtexDiffExpHasData, id, tab, plotData]);

  const getConfigPath = () => {
    const configPaths = {
      target: `${configAPI}/NonBatchCorrected_Config.json`,
      pmtl: `${configAPI}/GtexDiffExpRankByPmtlGene_Config.json`,
      allGene: `${configAPI}/GtexDiffExpRankByAllGene_Config.json`,
    };
  
    const pathKey = selectedOption.includes('pmtl') ? 'pmtl' : 'allGene';
    return entity === 'target' ? configPaths.target : configPaths[pathKey];
  }
  const [configDataDownloaderColumns] = useColumnConfiguration(getConfigPath(), true);

  const renderSelectionAndDownloader = () => {
    const downloaderColumnSize = entity === 'target' ? 12 : 6;

    return (
      <Grid item container>
        {entity === 'disease' && (
          <Grid item xs={12} sm={6} className={classes.selectContainer}>
            <RankBySelect
              isLoading={loading}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              options={rankOptions}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={downloaderColumnSize} className={classes.downloaderContainer}>
          <DataDownloader
            rows={gtexDiffExpJson}
            columns={configDataDownloaderColumns}
            fileStem={fileStem}
            downloadBtnLabel='Download data as'
          />
        </Grid>
      </Grid>
    );
  };

  const tabs = [
    {
      label: 'Non-Batch Corrected',
      value: 'nonBatchCorrected',
      disabled: !gtexDiffExpHasData,
      id: 'nonBatchCorrected'
    },
    {
      label: 'Without GE Box Plots',
      value: 'withoutGeBoxPlots',
      disabled: !gtexDiffExpHasData,
      id: 'withoutGeBoxPlots',
    },
  ]

  return (
    <SectionItem
      definition={definition}
      request={{ data: { gtexDiffExpJson, plotData, }, error, loading }}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={({ gtexDiffExpJson, plotData }) => {
        return (
          <>
            <PedTabs value={tab} onChange={handleTabChange} tabs={tabs} />
            {renderSelectionAndDownloader()}
            <Grid item xs={12} className={classes.plotContainer}>
              <DisplayPlot
                imageSrc={plotData[selectedOption]?.[tab]}
                imageAlt={imageAlt}
                classes={classes.image}
              />
            </Grid>
          </>
        );
      }}
    />
  );
}

export default Body;