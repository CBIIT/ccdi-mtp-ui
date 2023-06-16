import React from 'react';
import Link from '../../../components/Link';
import { mtpLinks } from '../../../constants';

const Description = ({ symbol }) => (
  <>
    Somatic alterations associated with <strong>{symbol}</strong> in pediatric
    cancers. Source:{' '}
    <Link to={mtpLinks.openPedCan} external>
      OpenPedCan
    </Link>
  </>
);

export default Description;
