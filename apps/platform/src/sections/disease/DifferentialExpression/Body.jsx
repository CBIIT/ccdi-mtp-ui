import React from 'react';
import { getTopGeneDiseaseGtexDiffExpPlot } from '../../../utils/externalAPI';
import config from '../../../config';

import Description from './Description';

import { getData } from './Summary';
import { Body as OpenPedCanGeneExpression } from '../../common/DifferentialExpression';

function Body({ definition, id, label: name }) {
  const ensemblId = id;
  const downloadFileName = `DifferentialExpression-${ensemblId}`;
  const imageAlt = 'Heatmap of one disease and top differentially expressed genes';

  const configAPI = `${config.mtpConfig}/front-end/page_disease`;
  return (
    <OpenPedCanGeneExpression
      definition={definition}
      id={id}
      label={{ name }}
      entity="disease"
      Description={Description}
      configAPI={configAPI}
      fileStem={downloadFileName}
      getData={getData}
      getPlot={getTopGeneDiseaseGtexDiffExpPlot}
      imageAlt={imageAlt}
    />
  );
}

export default Body;
