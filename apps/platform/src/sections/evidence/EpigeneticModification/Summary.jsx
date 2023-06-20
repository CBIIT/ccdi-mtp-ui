import React from 'react';

import SummaryItem from '../../../components/Summary/SummaryItem';
import { dataTypesMap } from '../../../dataTypes';
import usePlatformApi from '../../../hooks/usePlatformApi';

import EPIGENETIC_MODIFICATION_SUMMARY from './EpigeneticModificationSummary.gql';

function Summary({ definition }) {
  const request = usePlatformApi(EPIGENETIC_MODIFICATION_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      id={"epigeneticModificationSummary"}
      renderSummary={data => {
        const hasData = definition.hasData(data);
        return hasData ? 'Available' : 'no data';
      }}
      subText={dataTypesMap.pediatric_cancer}
    />
  );
}

Summary.fragments = {
  evidenceEpigeneticModificationSummary: EPIGENETIC_MODIFICATION_SUMMARY,
};

export default Summary;
