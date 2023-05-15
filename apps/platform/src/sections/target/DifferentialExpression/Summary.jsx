import React, { useEffect, useState } from 'react';
import SummaryItem from '../../../components/Summary/SummaryItem';
import { getGeneAllCancerGtexDiffExpJson } from '../../../utils/externalAPI';
import { setDisplaySettingForExternal } from '../../common/OpenPedCanGeneExpression/utils';

export async function getData({id, setData, setLoading = () => {}, setHasData = () => {}}) {
  /********     Get JSON Data    ******** */
  const callback = resData => {
    setData(resData);
    setHasData(true);
    setLoading(false);
  };
  const errorHandler = error => {
    setHasData(false);
    setLoading(false);
    console.log("No Data for Gtex Diff Exp Tab: ", error)
  };
  await getGeneAllCancerGtexDiffExpJson({ id, callback, errorHandler });
}

function Summary({
  definition,
  id,
  displaySettingsForExternal,
  updateDisplaySettingsForExternal,
}) {
  const [gtexDiffExpLoading, setGtexDiffExpLoading] = useState(true);
  const [gtexDiffExpData, setGtexDiffExpData] = useState([]);
  const [error] = useState(false);

  useEffect(
    () => {
      /********     Get JSON Data    ********/
      if (gtexDiffExpData.length === 0 && gtexDiffExpLoading === true) {
        getData({ id, setData: setGtexDiffExpData, setLoading: setGtexDiffExpLoading });
      }
      return () => {
        setDisplaySettingForExternal(
          definition.hasData(gtexDiffExpData),
          definition.id,
          displaySettingsForExternal,
          updateDisplaySettingsForExternal
        );
      };
    },
    [definition, displaySettingsForExternal, gtexDiffExpData, gtexDiffExpLoading, id, updateDisplaySettingsForExternal]
  );

  const loading = gtexDiffExpLoading;
  const request = { loading, data: gtexDiffExpData, error: error };

  return (
    <SummaryItem
      definition={definition}
      request={request}
      id={'differentialExpressionSummary'}
      renderSummary={data => {
        const hasData = definition.hasData(data);
        return hasData ? 'Available' : 'no data';
      }}
    />
  );
}

export default Summary;
