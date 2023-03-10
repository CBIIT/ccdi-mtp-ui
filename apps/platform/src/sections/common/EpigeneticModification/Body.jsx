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

  const emTabs = ['methylationByGene', 'methylationByIsoform']
  const defualtTabPros = {
    summaryData: summaryRequest?.data,
    widgetTabs: emTabs,
    initialDefaultTab: 'methylationByGene',
  }
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
        // TODO: replace w/ const { methylationByGene, methylationByIsoform, } = data;
        const {
          methylationByGene,
          methylationByIsoform,
        } = {
          methylationByGene: {
            evidences: {
              count: 1,
              rows: [{"geneSymbol": "WASH7P","targetFromSourceId": "ENSG00000227232","geneFeature": "Promoter","dataset": "PBTA","Disease": "Low-grade glioma/astrocytoma","diseaseFromSourceMappedId": "MONDO_0016685",
              "MONDO": "MONDO_0016685","medianTPM": 80,"rnaCorrelation": -0.0898345,"probeID": "cg26006703","chromosome": 1,"location": 14111,"betaQ1": 0.482949431,"betaQ2": 0.61202675,
              "betaMedian": 0.646154732,"betaQ4": 0.684985932,"betaQ5": 0.790792093,"datatypeId": "pediatric_cancer","chop_uuid": "f5b5c5ac-883a-4f6d-b1a3-8136b982d6c2","datasourceId": "chop_gene_level_methylation"}]
            }
          },
          methylationByIsoform: {
            evidences: {
              count: 1,
              rows: [{"geneSymbol": "MIR1302-2HG","targetFromSourceId": "ENSG00000243485","geneFeature": "Promoter","dataset": "PBTA","Disease": "Low-grade glioma/astrocytoma","diseaseFromSourceMappedId": "MONDO_0016685",
              "MONDO": "MONDO_0016685","medianTPM": 40,"rnaCorrelation": -0.05718872,"probeID": "cg12045430","chromosome": 1,"location": 29407,"betaQ1": 0.02232324,"betaQ2": 0.067455865,
              "betaMedian": 0.084832527,"betaQ4": 0.101749238,"betaQ5": 0.198324323,"datatypeId": "pediatric_cancer","chop_uuid": "9b99f156-1f6d-424c-8ff7-2cd1989e184a","datasourceId": "chop_gene_level_methylation"}]
            }
          }
        }
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
                disabled={methylationByGene.evidences.count === 0}
                id="methylByGeneTab"
              />
              <Tab
                value="methylationByIsoform"
                label="Methylation By Isoform"
                disabled={methylationByIsoform.evidences.count === 0}
                id="methylByIsoformTab"
              />
            </Tabs>

            {tab === 'methylationByGene' && methylationByGene.evidences.count !== 0 && (
              <MethylationByGeneTab
                data={methylationByGene?.evidences?.rows || []}
                BODY_QUERY={BODY_QUERY}
                variables={variables}
                dataDownloaderFileStem={dataDownloaderFileStem}
                configColumns={methylByGeneColumns}
                configDataDownloaderColumns={methylByGeneDataDownloaderColumns}
              />
            )}

            {tab === 'methylationByIsoform' && methylationByIsoform.evidences.count !== 0 && (
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
