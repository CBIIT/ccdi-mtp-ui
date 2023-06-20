export const definition = {
  id: 'openPedCanGeneExpressionTarget',
  name: 'OpenPedCan Gene Expression',
  shortName: 'GX',
  hasData: ({ gtexData, tcgaData }) => {
    return gtexData?.length > 0 || tcgaData?.length > 0 || false;
  },
  color: '#5ca300',
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
