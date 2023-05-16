import React, { useEffect, useState } from 'react';
import SummaryItem from '../../../components/Summary/SummaryItem';

import { getGeneDiseaseGtexJson, getGeneDiseaseTcgaJson } from '../../../utils/externalAPI';
import { dataTypesMap } from '../../../dataTypes';
import { setDisplaySettingForExternal } from '../../common/OpenPedCanGeneExpression/utils';

export async function getTcgaData({ id, callBack, errorHandler }) {
  const { ensgId: ensemblId, efoId } = id;
  /********     Get TCGA JSON Data    ******** */
  await getGeneDiseaseTcgaJson(ensemblId, efoId, callBack, errorHandler);
}

export async function getGtexData({ id, callBack, errorHandler }) {
  const { ensgId: ensemblId, efoId } = id;
  /********     Get GTEx JSON Data    ******** */
  await getGeneDiseaseGtexJson(ensemblId, efoId, callBack, errorHandler);
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

  const callBack = (resData, setData, setLoading) => {
    setData(resData);
    setLoading(false);
  }
  const errorHandler = (error, setLoading, tabLabel='GTEx') => {
    setLoading(false);
    console.log(`No Data for ${tabLabel} Tab: `, error)
  }

  useEffect(
    () => {
      /********     Get JSON Data    ********/
      if (gtexData.length === 0 && gtexLoading === true) {
        getGtexData({
          id,
          callBack: (resData) => callBack(resData, setGtexData, setGtexLoading),
          errorHandler: (error) => errorHandler(error, setGtexLoading),
        });
      }
      if (tcgaData.length === 0 && tcgaLoading === true) {
        getTcgaData({
          id,
          callBack: (resData) => callBack(resData, setTcgaData, setTcgaLoading),
          errorHandler: (error) => errorHandler(error, setTcgaLoading, 'TCGA'),
        });
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
