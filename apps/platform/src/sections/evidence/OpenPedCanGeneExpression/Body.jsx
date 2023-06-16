import React from 'react';
import { getGeneDiseaseGtexPlot, getGeneDiseaseTcgaPlot } from '../../../utils/externalAPI';
import config from '../../../config';
import Description from './Description';

import { getGtexData, getTcgaData } from './Summary';
import { Body as OpenPedCanGeneExpressionBody } from '../../common/OpenPedCanGeneExpression';

function Body({ definition, id, label }) {

  const { ensgId: ensemblId, efoId } = id;
  const downloadFileName = `OpenPedCanGeneExpression-${ensemblId}-${efoId}`;
  const gtexImageAlt = 'Single-gene single-disease all-GTEx-tissue-subgroups';
  const tcgaImageAlt = 'Single-gene all-diseases all-TCGA';
  const configAPI = `${config.mtpConfig}/front-end/page_evidence`;

  return (
    <OpenPedCanGeneExpressionBody
      definition={definition}
      id={id}
      label={label}
      entity="evidence"
      Description={Description}
      configAPI={configAPI}
      fileStem={downloadFileName}
      getGtexData={getGtexData}
      getGtexPlot={getGeneDiseaseGtexPlot}
      gtexImageAlt={gtexImageAlt}
      getTcgaData={getTcgaData}
      getTcgaPlot={getGeneDiseaseTcgaPlot}
      tcgaImageAlt={tcgaImageAlt}
    />
  );
}

export default Body;
