import React, { useEffect, useMemo, useState } from 'react';
import { Tab, Tabs, makeStyles } from '@material-ui/core';
import { Buffer } from 'buffer';
import SectionItem from '../../../components/Section/SectionItem';
import { dataTypesMap } from '../../../dataTypes';
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
  getGtexData,
  getGtexPlot,
  gtexImageAlt,
  getTcgaData,
  getTcgaPlot,
  tcgaImageAlt,
}) {
  const [gtexJson, setGtexJson] = useState([]);
  const [gtexLinearPlot, setGtexLinearPlot] = useState('');
  const [gtexLog10Plot, setGtexLog10Plot] = useState('');
  const [gtexHasData, setGtexHasData] = useState(false);

  const [tcgaJson, setTcgaJson] = useState([]);
  const [tcgaLinearPlot, setTcgaLinearPlot] = useState('');
  const [tcgaLog10Plot, setTcgaLog10Plot] = useState('');
  const [tcgaHasData, setTcgaHasData] = useState(false);
  const [tab, setTab] = useState('gtexLinear');

  const [tcgaJsonLoading, setTcgaJsonLoading] = useState(true);
  const [gtexJsonLoading, setGtexJsonLoading] = useState(true);

  const [plotLoading, setPlotLoading] = useState(true);
  // TODO: Handle Error better
  const [error] = useState(false);

  const classes = useStyles();
  
  const generticId = useMemo(() => entity === 'evidence' ? [id.ensgId, id.efoId] : [id], [id, entity])

  const handlePlotData = (resData, setPlot) => {
    const base64 = Buffer.from(resData).toString('base64');
    const imageSrc = base64;
    setPlot(imageSrc);
    setPlotLoading(false);
  }
  const handleError = (error) => {
    setPlotLoading(false);
    // setError(true);
    console.log("Gene Expression widget: ", error);
  }

  const handleOnChange = (_, tab) => {
    return setTab(tab);
  };
  const handleJsonData = (resData, setData, setHasData, setLoading) => {
    setData(resData);
    setHasData(true);
    setLoading(false);
  }
  const handleJsonError = (error, setHasData, setLoading, setTab=()=>{}, tab='GTEx') => {
    setTab()
    setHasData(false);
    setLoading(false);
    console.log(`No Data for ${tab}: `, error);
  }
  useEffect(() => {
        /********     Get GTEx JSON Data    ******** */
    getGtexData({
      id,
      callBack: (resData) => handleJsonData(resData, setGtexJson, setGtexHasData, setGtexJsonLoading),
      errorHandler: (error) => handleJsonError(error, setGtexHasData, setGtexJsonLoading, ()=>setTab('tcgaLinear'))
    });
        /********     Get TCGA JSON Data    ******** */
    getTcgaData({
      id,
      callBack: (resData) => handleJsonData(resData, setTcgaJson, setTcgaHasData, setTcgaJsonLoading),
      errorHandler: (error) => handleJsonError(error, setTcgaHasData, setTcgaJsonLoading, 'TCGA'),
    });
    // setTab(gtexHasData ? 'gtexLinear' : 'tcgaLinear')
  }, [id, getGtexData, getTcgaData ]);


  useEffect(
    () => {
      if (gtexHasData && tab === 'gtexLinear' && gtexLinearPlot.length === 0) {
        /********     Get GTEx Linear Plot    ******** */
        setPlotLoading(true);
        getGtexPlot(
          ...generticId, 'linear', resData => handlePlotData(resData, setGtexLinearPlot), handleError,
        );
      }
      if (gtexHasData && tab === 'gtexLog10' && gtexLog10Plot.length === 0) {
        /********     Get GTEx Log10 Plot    ******** */
        setPlotLoading(true);
        getGtexPlot(
          ...generticId, 'log10', resData => handlePlotData(resData, setGtexLog10Plot), handleError,
        );
      }
      if (tcgaHasData && tab === 'tcgaLinear' && tcgaLinearPlot.length === 0) {
        /********     Get TCGA Linear Plot    ******** */
        setPlotLoading(true);
        getTcgaPlot(
          ...generticId, 'linear', resData => handlePlotData(resData, setTcgaLinearPlot), handleError,
        );
      }
      if (tcgaHasData && tab === 'tcgaLog10' && tcgaLog10Plot.length === 0) {
        /********     Get TCGA Log10 Plot    ******** */
        setPlotLoading(true);
        getTcgaPlot(
          ...generticId, 'log10', resData => handlePlotData(resData, setTcgaLog10Plot), handleError,
        );
      }
    },
    [
      tab,
      generticId,

      gtexLinearPlot,
      gtexLog10Plot,
      getGtexPlot,
      gtexHasData,

      tcgaLinearPlot,
      tcgaLog10Plot,
      getTcgaPlot,
      tcgaHasData,
    ]
  );

  /* Get GTEx Dowload Column */
  const gtexConfigAPI = `${configAPI}/GeneExpressionGTEx_Config.json`
  const [gtexConfigDataDownloaderColumns] = useColumnConfiguration(gtexConfigAPI, true);

  /* Get TCGA Dowload Column */
  const tcgaConfigAPI = `${configAPI}/GeneExpressionTCGA_Config.json`
  const [tcgaConfigDataDownloaderColumns] = useColumnConfiguration(tcgaConfigAPI, true);

  const tabs = [
    {
      label: entity === 'evidence' ? 'GTEx Linear' : 'OpenPedCan Linear',
      value: 'gtexLinear',
      disabled: !gtexHasData,
      id: 'geneExpressionLinearTab',
    },
    {
      label: entity === 'evidence' ? 'GTEx Log 10' : 'OpenPedCan Log 10',
      value: 'gtexLog10',
      disabled: !gtexHasData,
      id: 'geneExpressionLog10Tab',
    },
    {
      label: entity === 'evidence' ? 'TCGA Linear' : 'OpenPedCan + Adult Linear',
      value: 'tcgaLinear',
      disabled: !tcgaHasData,
      id: 'geneExpressionTcgaLinearTab',
    },
    {
      label: entity === 'evidence' ? 'TCGA Log 10' : 'OpenPedCan + Adult Log 10',
      value: 'tcgaLog10',
      disabled: !tcgaHasData,
      id: 'geneExpressionTcgaLog10Tab',
    }
  ];
  const loading = gtexJsonLoading || tcgaJsonLoading || plotLoading

  return (
    <SectionItem
      definition={definition}
      chipText={entity === 'evidence' ? dataTypesMap.pediatric_cancer : ''}
      request={{
        data: { gtexJson, gtexLinearPlot, gtexLog10Plot, tcgaJson, tcgaLinearPlot, tcgaLog10Plot, },
        error,
        loading,
      }}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={data => {
        const {
          gtexJson, gtexLinearPlot, gtexLog10Plot, tcgaJson, tcgaLinearPlot, tcgaLog10Plot,
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
              {tabs.map(({ label, value, disabled, id }) => (
                <Tab key={id} value={value} label={label} disabled={disabled} id={id} />
              ))}
            </Tabs>
            {/* GTEx or OpenPedCan - Linear */}
            {gtexHasData && tab === 'gtexLinear' ? (
              <PlotContainer
                DDRows={gtexJson}
                DDColumns={gtexConfigDataDownloaderColumns || {}}
                DDFileStem={fileStem}
                id="geneExpressionLinear"
              >
                <DisplayPlot
                  imageSrc={gtexLinearPlot}
                  imageAlt={`${gtexImageAlt} TPM boxplot (Linear)`}
                  classes={classes.image} />
              </PlotContainer>
            ) : null}

            {/* GTEx or OpenPedCan - Log10 */}
            {gtexHasData && tab === 'gtexLog10' ? (
              <PlotContainer
                DDRows={gtexJson}
                DDColumns={gtexConfigDataDownloaderColumns || {}}
                DDFileStem={fileStem}
                id="geneExpressionLog10"
              >
                <DisplayPlot
                  imageSrc={gtexLog10Plot}
                  imageAlt={`${gtexImageAlt} TPM boxplot (Lag10)`}
                  classes={classes.image} />
              </PlotContainer>
            ) : null}
            {/* TCGA or OpenPedCan + Adult - Linear */}
            {tcgaHasData && tab === 'tcgaLinear' ? (
              <PlotContainer
                DDRows={tcgaJson}
                DDColumns={tcgaConfigDataDownloaderColumns || {}}
                DDFileStem={fileStem}
              >
                <DisplayPlot
                  imageSrc={tcgaLinearPlot}
                  imageAlt={`${tcgaImageAlt} TPM boxplot (Linear)`}
                  classes={classes.image} />
              </PlotContainer>
            ) : null}
            {/* TCGA or OpenPedCan + Adult - Log10 */}
            {tcgaHasData && tab === 'tcgaLog10' ? (
              <PlotContainer
                DDRows={tcgaJson}
                DDColumns={tcgaConfigDataDownloaderColumns || {}}
                DDFileStem={fileStem}
              >
                <DisplayPlot
                  imageSrc={tcgaLog10Plot}
                  imageAlt={`${tcgaImageAlt} TPM boxplot (Lag10)`}
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
