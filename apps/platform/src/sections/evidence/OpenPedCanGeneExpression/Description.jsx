import React from 'react';
import Link from '../../../components/Link';
import { mtpLinks } from '../../../constants';

const Description = ({ symbol, name }) => (
  <>
    mRNA expression of
    <strong> {symbol} </strong> in pediatric
    <strong> {name} </strong> with human adult normal tissues from GTEx. Source:{' '}
    <Link to={mtpLinks.openPedCan} external>
      OpenPedCan
    </Link>
  </>
);

export default Description;
