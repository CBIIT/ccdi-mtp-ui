import React from 'react';

function DisplayPlot({ imageSrc, imageAlt, classes }){
  if (!imageSrc) return null;
  
  return (
    <img
      src={`data:image/png;base64,${imageSrc}`}
      className={classes}
      alt={imageAlt}
    />
  );
};

export default DisplayPlot;