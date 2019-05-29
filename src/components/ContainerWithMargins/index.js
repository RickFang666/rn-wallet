import styled from 'styled-components/native';
import { isIphoneX } from 'react-native-iphone-x-helper';

const ContainerWithMargins = styled.View`
  padding-top: ${({ hasTop }) => (hasTop ? (isIphoneX() ? 93 : 68) : 0)};
  padding-bottom: ${({ hasBottom }) => (hasBottom ? (isIphoneX() ? 90 : 50) : 0)};
`;

export default ContainerWithMargins;
