import React, { useEffect, useState } from 'react';
import SummaryItem from '../../../components/Summary/SummaryItem';

import { getGeneDiseaseGtexJson, getGeneDiseaseTcgaJson } from '../../../utils/externalAPI';
import { dataTypesMap } from '../../../dataTypes';
import { setDisplaySettingForExternal } from '../../common/OpenPedCanGeneExpression/utils';

export async function getTcgaData(id, setData, setLoading, setHasData = () => {}) {
  const { ensgId: ensemblId, efoId } = id;
  /********     Get TCGA JSON Data    ******** */
  await getGeneDiseaseTcgaJson(
    ensemblId,
    efoId,
    resData => {
      setData(resData);
      setHasData(true);
      setLoading(false);
    },
    error => {
      setHasData(false);
      setLoading(false);
      console.log("No Data for TCGA Tab: ", error)
    },
  );
}

export async function getGtexData(id, setData, setLoading, setHasData = () => {}) {
  const { ensgId: ensemblId, efoId } = id;
  /********     Get GTEx JSON Data    ******** */
  await getGeneDiseaseGtexJson(
    ensemblId,
    efoId,
    resData => {
      setData(resData);
      setHasData(true);
      setLoading(false);
    },
    error => {
      setHasData(false);
      setLoading(false);
      console.log("No Data for GTEx Tab: ", error)
    },
  );
}

function Summary({
  definition,
  id,
  displaySettingsForExternal,
  updateDisplaySettingsForExternal,
}) {
  const [gtexLoading, setGtexLoading] = useState(true);
  const [gtexData, setGtexData] = useState([]);

  const [tcgaLoading, setTcgaLoading] = useState(true);
  const [tcgaData, setTcgaData] = useState([]);

  const [error] = useState(false);

  useEffect(
    () => {
      /********     Get JSON Data    ********/
      if (gtexData.length === 0 && gtexLoading === true) {
        getGtexData(id, setGtexData, setGtexLoading);
      }
      if (tcgaData.length === 0 && tcgaLoading === true) {
        getTcgaData(id, setTcgaData, setTcgaLoading);
      }
      return () => {
        setDisplaySettingForExternal(
          definition.hasData({ gtexData, tcgaData }),
          definition.id,
          displaySettingsForExternal,
          updateDisplaySettingsForExternal
        );
      };
    },
    [
      id,
      definition,
      displaySettingsForExternal,
      updateDisplaySettingsForExternal,
      gtexData,
      gtexLoading,
      tcgaLoading,
      tcgaData
    ]
  );
  const loading = tcgaLoading && gtexLoading;
  const request = { loading, data: { gtexData, tcgaData }, error: error };

  return (
    <SummaryItem
      definition={definition}
      request={request}
      id={'geneExpressionSummary'}
      renderSummary={data => {
        const hasData = definition.hasData(data);
        return hasData ? 'Available' : 'no data';
      }}
      subText={dataTypesMap.pediatric_cancer}
    />
  );
}

export default Summary;
