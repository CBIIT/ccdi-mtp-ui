import React from 'react';
import Link from '../../../components/Link';
import { mtpLinks } from '../../../constants';

const Description = ({ symbol }) => (
  <>
    Differential expression of
    <strong> {symbol} </strong> in pediatric tumors. Source:{' '}
    <Link to={mtpLinks.openPedCan} external>
      OpenPedCan
    </Link>
  </>
);

export default Description;
