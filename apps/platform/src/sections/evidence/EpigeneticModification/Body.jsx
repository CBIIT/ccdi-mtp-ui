import React from 'react';

import config from '../../../config';
import { Body as EpigeneticModificationBody } from '../../common/EpigeneticModification';
import Description from './Description';

import usePlatformApi from '../../../hooks/usePlatformApi';
import Summary from './Summary';

import EPIGENETIC_MODIFICATION_QUERY from './EpigeneticModificationQuery.gql';

function Body({ definition, id, label }) {
  const summaryRequest = usePlatformApi(
    Summary.fragments.evidenceEpigeneticModificationSummary
  );

  const { ensgId: ensemblId, efoId } = id;
  const variables = { ensemblId, efoId };
  const dataDownloaderFileStem = `EpigeneticModification-${ensemblId}-${efoId}`;
  const configAPI = `${config.mtpConfig}/front-end/page_evidence`;
  return (
    <EpigeneticModificationBody
      definition={definition}
      id={id}
      label={label}
      entity="evidence"
      variables={variables}
      BODY_QUERY={EPIGENETIC_MODIFICATION_QUERY}
      summaryRequest={summaryRequest}
      Description={Description}
      dataDownloaderFileStem={dataDownloaderFileStem}
      configAPI={configAPI}
    />
  );
}

export default Body;
