export const definition = {
  id: 'epigeneticModification',
  name: 'Epigenetic Modification',
  shortName: 'EM',
  hasData: data => {
    const hasCount = data?.methylationByGene?.count > 0 || data?.methylationByIsoform?.count > 0;
    return hasCount;
  },
  color: '#5ca300',
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
