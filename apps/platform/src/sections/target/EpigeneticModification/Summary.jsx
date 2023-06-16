import React from 'react';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

import EPIGENETIC_MODIFICATION_QUERY from './EpigeneticModificationSummary.gql';

function Summary({ definition }) {
  const request = usePlatformApi(EPIGENETIC_MODIFICATION_QUERY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      id={'epigeneticModification'}
      renderSummary={data => {
        const hasData = definition.hasData(data);
        return hasData ? 'Available' : 'no data';
      }}
    />
  );
}

Summary.fragments = {
  targetEpigeneticModificationSummary: EPIGENETIC_MODIFICATION_QUERY,
};

export default Summary;
