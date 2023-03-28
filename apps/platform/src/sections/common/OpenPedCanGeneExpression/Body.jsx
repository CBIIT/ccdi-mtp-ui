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
  getData,
  getPlot,
  Description,
  entity,
  fileStem,
  imageAlt,
  configAPI,
}) {
  const [gtexJson, setGtexJson] = useState([]);
  const [gtexLinearPlot, setGtexLinearPlot] = useState('');
  const [gtexLog10Plot, setGtexLog10Plot] = useState('');
  const [tab, setTab] = useState('gtexLinear');
  // Figure out how to have gtex vs tcga loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [gtexHasData, setGtexHasData] = useState(false);
  const classes = useStyles();
  
  const generticId = useMemo(() => entity === 'evidence' ? [id.ensgId, id.efoId] : [id], [id, entity])

  const handlePlotData = (resData, setPlot) => {
    const base64 = Buffer.from(resData).toString('base64');
    const imageSrc = base64;
    setPlot(imageSrc);
    setLoading(false);
  }
  const handleError = (error) => {
    setLoading(false);
    setError(true);
    console.log("Gene Expression widget: ", error);
  }


  const handleOnChange = (_, tab) => {
    return setTab(tab);
  };

  useEffect(
    () => {
      if (tab === 'gtexLinear' && gtexLinearPlot.length === 0) {
        /********     Get GTEx Linear Plot    ******** */
        setLoading(true);
        getPlot( 
          ...generticId, 'linear', resData => handlePlotData(resData, setGtexLinearPlot), handleError,
        );
      } else if (tab === 'gtexLog10' && gtexLog10Plot.length === 0) {
        console.log("|| Getting gtexLog10Plot ");
        /********     Get GTEx Log10 Plot    ******** */
        setLoading(true);
        getPlot(
          ...generticId, 'log10', resData => handlePlotData(resData, setGtexLog10Plot), handleError,
        );
      }
      return () => {
        /********     Get GTEx JSON Data    ******** */
        if (!gtexHasData) getData(id, setGtexJson, setLoading, setGtexHasData);
      };
    },
    [ tab, gtexLinearPlot, gtexLog10Plot, id, getData, getPlot, entity, generticId, gtexHasData ]
  );

  const gtexConfigAPI = `${configAPI}/GeneExpressionGTEx_Config.json`
  const [gtexConfigDataDownloaderColumns] = useColumnConfiguration(gtexConfigAPI, true);
  return (
    <SectionItem
      definition={definition}
      chipText={entity === 'evidence' ? dataTypesMap.pediatric_cancer : ''}
      request={{ data: { gtexLinearPlot, gtexLog10Plot, gtexJson }, error, loading }}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={data => {
        const { gtexJson, gtexLinearPlot, gtexLog10Plot } = data;
        return (
          <>
            <Tabs
              value={tab}
              onChange={handleOnChange}
              style={{ marginBottom: '1rem' }}
              className={classes.tabs}
            >
              <Tab value="gtexLinear" label="GTEx Linear" id="geneExpressionLinearTab" />
              <Tab value="gtexLog10" label="GTEx Log 10" id="geneExpressionLog10Tab" />
            </Tabs>
            {/* GTEx - Linear */}
            {tab === 'gtexLinear' ? (
              <PlotContainer
                DDRows={gtexJson}
                DDColumns={gtexConfigDataDownloaderColumns || {}}
                DDFileStem={fileStem}
                id="geneExpressionLinear"
              >
                <DisplayPlot
                  imageSrc={gtexLinearPlot}
                  imageAlt={`${imageAlt} TPM boxplot (Linear)`}
                  classes={classes.image} />
              </PlotContainer>
            ) : null}

            {/* GTEx - Log10 */}
            {tab === 'gtexLog10' ? (
              <PlotContainer
                DDRows={gtexJson}
                DDColumns={gtexConfigDataDownloaderColumns || {}}
                DDFileStem={fileStem}
                id="geneExpressionLog10"
              >
                <DisplayPlot
                  imageSrc={gtexLog10Plot}
                  imageAlt={`${imageAlt} TPM boxplot (Lag10)`}
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
