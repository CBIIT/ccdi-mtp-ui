export const definition = {
  id: 'epigeneticModification',
  name: 'Epigenetic Modification',
  shortName: 'EM',
  hasData: data => {
    const { methylationByGene, methylationByIsoform, } = data;
    const hasCount = methylationByGene?.count > 0 || methylationByIsoform?.count > 0;
    return hasCount;
  },
  color: '#5ca300',
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
