import React from 'react';
import { Link } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { colorRange } from '../constants';

function Legend({ url, urlLabel, hideLink, newTab }) {
  const linkUrl = url
    ? url
    : 'https://platform-docs.opentargets.org/associations#association-scores';
  const linkLabel = urlLabel ? urlLabel : 'Score';
  const newTabProps = newTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <div>
      <span
        style={{
          display: 'inline-block',
          border: '1px solid #eeefef',
          height: '20px',
          width: '20px',
        }}
      />{' '}
      <span style={{ position: 'relative', bottom: '5px' }}>No data</span>
      <div style={{ display: 'flex' }}>
        <div style={{ height: '20px', width: '20px', textAlign: 'center' }}>
          0
        </div>
        {colorRange.map(color => {
          return (
            <div
              key={color}
              style={{
                backgroundColor: color,
                height: '20px',
                width: '20px',
              }}
            />
          );
        })}
        <div style={{ height: '20px', width: '20px', textAlign: 'center' }}>
          1
        </div>
      </div>
      {hideLink ? null : (
        <Link href={linkUrl} {...newTabProps}>
          <FontAwesomeIcon icon={faQuestionCircle} size="xs" /> {linkLabel}
        </Link>
      )}
    </div>
  );
}

export default Legend;
