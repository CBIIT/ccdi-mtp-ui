export const definition = {
  id: 'differentialExpression',
  name: 'Differential Expression',
  shortName: 'DE',
  hasData: (data) => {
    return data.length > 0;
  },
  color: '#5ca300',
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
