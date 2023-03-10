export const definition = {
  id: 'epigeneticModification',
  name: 'Epigenetic Modification',
  shortName: 'EM',
  hasData: data => {
    /*
    TODO: Replace with epigeneticModification related data
    const { methylationByGene, methylationByIsoform, } = data;
    const hasCount = methylationByGene.count > 0 || methylationByIsoform.count > 0
    */
    const { snvByGene, snvByVariant, cnvByGene, fusionByGene, fusion } = data;
    const hasCount =
      snvByGene.count > 0 ||
      snvByVariant.count > 0 ||
      cnvByGene.count > 0 ||
      fusionByGene.count > 0 ||
      fusion.count > 0;
    return hasCount;
  },
  color: '#5ca300',
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
