import React from 'react';
import { getGeneAllCancerGtexDiffExpPlot } from '../../../utils/externalAPI';
import config from '../../../config';

import Description from './Description';

import { getData } from './Summary';
import { Body as OpenPedCanGeneExpression } from '../../common/DifferentialExpression';

function Body({ definition, id, label: symbol }) {
  const ensemblId = id;
  const downloadFileName = `DifferentialExpression-${ensemblId}`;
  const imageAlt = 'Differential gene expression heatmap of one gene and all diseases';

  const configAPI = `${config.mtpConfig}/front-end/page_target`;
  return (
    <OpenPedCanGeneExpression
      definition={definition}
      id={id}
      label={{ symbol }}
      entity="target"
      Description={Description}
      configAPI={configAPI}
      fileStem={downloadFileName}
      getData={getData}
      getPlot={getGeneAllCancerGtexDiffExpPlot}
      imageAlt={imageAlt}
    />
  );
}

export default Body;
