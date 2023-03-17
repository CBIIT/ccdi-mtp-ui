import React, { useState } from 'react';
import { Tab, Tabs, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import SectionItem from '../../../components/Section/SectionItem';
import { dataTypesMap } from '../../../dataTypes';

import { getDefaultTab } from '../../../utils/columnConfig';
import useColumnConfiguration from '../../../hooks/useColumnConfiguration';
import MethylationByGeneTab from './MethylationByGeneTab';
import MethylationByIsoformTab from './MethylationByIsoformTab';

function Body({
  definition,
  id,
  label,
  entity,
  variables,
  BODY_QUERY,
  summaryRequest,
  Description,
  dataDownloaderFileStem,
  configAPI,
}) {
  const request = useQuery(BODY_QUERY, {
    variables: { ...variables, size: 9999 },
  });
  // Tabs under Epigenetic Modification widget
  const emTabs = ['methylationByGene', 'methylationByIsoform']

  const defualtTabPros = {
    summaryData: summaryRequest?.data,
    widgetTabs: emTabs,
    initialDefaultTab: 'methylationByGene',
  }
  // Based on the Data availability, get default Tab
  const defaultTab = getDefaultTab(defualtTabPros);
  const [tab, setTab] = useState(defaultTab);

  // Config Columns for Methylation By Gene
  const [
    methylByGeneColumns,
    methylByGeneDataDownloaderColumns,
  ] = useColumnConfiguration(`${configAPI}/MethylByGene_Config.json`);

   // Config Columns for Methylation By Isoform
   const [
    methylByIsoformColumns,
    methylByIsoformDataDownloaderColumns,
  ] = useColumnConfiguration(`${configAPI}/MethylByIsoform_Config.json`);
  

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
  });

  const classes = useStyles();

  const handleChangeTab = (_, tab) => {
    setTab(tab);
  };

  return (
    <SectionItem
      definition={definition}
      chipText={entity === 'evidence' ? dataTypesMap.pediatric_cancer : ''}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={data => {
        const { methylationByGene, methylationByIsoform, } = data;
        const methylationByGeneCount = methylationByGene?.evidences?.count;
        const methylationByIsoformCount = methylationByIsoform?.evidences?.count;

        return (
          <>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              style={{ marginBottom: '2rem' }}
              className={classes.tabs}
            >
              <Tab
                value="methylationByGene"
                label="Methylation By Gene"
                disabled={methylationByGeneCount === 0}
                id="methylationByGeneTab"
              />
              <Tab
                value="methylationByIsoform"
                label="Methylation By Isoform"
                disabled={methylationByIsoformCount === 0}
                id="methylationByIsoformTab"
              />
            </Tabs>

            {tab === 'methylationByGene' && methylationByGeneCount !== 0 && (
              <MethylationByGeneTab
                data={methylationByGene?.evidences?.rows || []}
                BODY_QUERY={BODY_QUERY}
                variables={variables}
                dataDownloaderFileStem={dataDownloaderFileStem}
                configColumns={methylByGeneColumns}
                configDataDownloaderColumns={methylByGeneDataDownloaderColumns}
              />
            )}

            {tab === 'methylationByIsoform' && methylationByIsoformCount !== 0 && (
              <MethylationByIsoformTab
                data={methylationByIsoform?.evidences?.rows || []}
                BODY_QUERY={BODY_QUERY}
                variables={variables}
                dataDownloaderFileStem={dataDownloaderFileStem}
                configColumns={methylByIsoformColumns}
                configDataDownloaderColumns={methylByIsoformDataDownloaderColumns}
              />
            )}
          </>
        );
      }}
    />
  );
}

export default Body;
