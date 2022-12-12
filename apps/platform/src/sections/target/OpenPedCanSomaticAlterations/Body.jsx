import React from 'react';

import config from '../../../config';
import { Body as OpenPedCanSomaticAlterationsBody } from '../../common/OpenPedCanSomaticAlterations';
import Description from './Description';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Summary from './Summary';

import SOMATIC_ALTERATIONS_QUERY from './SomaticAlterationsQuery.gql';

function Body({ definition, id, label: symbol }) {
  const summaryRequest = usePlatformApi(
    Summary.fragments.targetSomaticAlterationsSummary
  );

  const variables = { ensemblId: id };
  const dataDownloaderFileStem = `OpenPedCanSomaticAlterations-${id}`;
  const configAPI = `${config.mtpConfig}/front-end/page_target`;
  return (
    <OpenPedCanSomaticAlterationsBody
      definition={definition}
      id={id}
      label={{ symbol }}
      entity="target"
      variables={variables}
      BODY_QUERY={SOMATIC_ALTERATIONS_QUERY}
      summaryRequest={summaryRequest}
      Description={Description}
      dataDownloaderFileStem={dataDownloaderFileStem}
      configAPI={configAPI}
    />
  );
}

export default Body;
