import React from 'react';
import styled from 'styled-components';
import usaFlagSmall from '../../assets/us_flag_small.svg';

const BannerArea = styled.div`
    flex-direction:row;
    width: 100%;
    height: 46px;
    background: #F0F0F0;

`;
const BannerContainer = styled.div`
    display:flex;
    align-items:center;
    max-width: 1800px;
    height:100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 2rem;
    img{
        margin-right: 14px;
    }
    .text{
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        width: fit-content;
        height: 16px;
        color: black;
    }
    @media (max-width: 1023px) {
        padding-left: 1rem;
    }
`;
const config = {
    usaFlagSmall,
    usaFlagSmallAltText: 'usaFlagSmall',
}


const USABanner = () => (
  <BannerArea>
    <BannerContainer>
      <img src={config.usaFlagSmall} alt={config.usaFlagSmallAltText} />
      <div className="text">
        An official website of the United States government
      </div>
    </BannerContainer>
  </BannerArea>
  );

export default USABanner;
