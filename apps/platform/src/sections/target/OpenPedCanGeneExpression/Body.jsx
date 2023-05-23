import React from 'react';
import { getGeneAllCancerPlot, getGeneAllCancerTcgaPlot } from '../../../utils/externalAPI';
import config from '../../../config';

import Description from './Description';

import { getGtexData, getTcgaData } from './Summary';
import { Body as OpenPedCanGeneExpression } from '../../common/OpenPedCanGeneExpression';

function Body({ definition, id, label: symbol }) {
  const ensemblId = id;
  const downloadFileName = `OpenPedCanGeneExpression-${ensemblId}`;
  const gtexImageAlt = 'Single-gene all-diseases';
  const tcgaImageAlt = 'Single-gene all-diseases all-TCGA';

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
      getGtexData={getGtexData}
      getGtexPlot={getGeneAllCancerPlot}
      gtexImageAlt={gtexImageAlt}
      getTcgaData={getTcgaData}
      getTcgaPlot={getGeneAllCancerTcgaPlot}
      tcgaImageAlt={tcgaImageAlt}
    />
  );
}

export default Body;
