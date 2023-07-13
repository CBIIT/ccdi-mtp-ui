import React from 'react';

function DisplayPlot({ imageSrc, imageAlt, classes }){
  if (!imageSrc) return null;
  
  return (
    <iframe src={imageSrc} title={imageAlt} width= "100%" height="1200px" style={{border: '0px'}}>
    </iframe>
  );
};

export default DisplayPlot;