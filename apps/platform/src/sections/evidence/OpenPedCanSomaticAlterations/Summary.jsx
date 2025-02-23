import React from 'react';

import SummaryItem from '../../../components/Summary/SummaryItem';
import { dataTypesMap } from '../../../dataTypes';
import usePlatformApi from '../../../hooks/usePlatformApi';

import SOMATIC_ALTERATIONS_SUMMARY from './SomaticAlterationsSummary.gql';

function Summary({ definition }) {
  const request = usePlatformApi(SOMATIC_ALTERATIONS_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      id={"somaticAlterationsSummary"}
      renderSummary={data => {
        const hasData = definition.hasData(data);
        return hasData ? 'Available' : 'no data';
      }}
      subText={dataTypesMap.pediatric_cancer}
    />
  );
}

Summary.fragments = {
  evidenceSomaticAlterationsSummary: SOMATIC_ALTERATIONS_SUMMARY,
};

export default Summary;
