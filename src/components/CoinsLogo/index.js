import React from 'react';
import styled from 'styled-components/native';

const Image = styled.Image.attrs({
  source: require('./background.png'),
})`
  width: 150;
  height: 73;
  align-self: center;
`;

export default () => <Image />;
