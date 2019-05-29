import React from 'react';
import styled from 'styled-components/native';

const BackgroundImage = styled.ImageBackground.attrs({
  source: require('./background.png'),
})`
  display: flex;
  flex: 1;
  background: #2A2A2A;
`;

export default ({ children, style }) => (
  <BackgroundImage style={style}>
    { children }
  </BackgroundImage>
);
