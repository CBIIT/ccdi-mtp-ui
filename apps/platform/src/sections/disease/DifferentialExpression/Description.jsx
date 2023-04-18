import React from 'react';
import Link from '../../../components/Link';
import { mtpLinks } from '../../../constants';

const Description = ({ name }) => (
  <>
    Differential expression of
    <strong> {name} </strong> in pediatric tumors. Source:{' '}
    <Link to={mtpLinks.openPedCan} external>
      OpenPedCan
    </Link>
  </>
);

export default Description;
