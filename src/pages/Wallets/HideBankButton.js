import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Touchable = styled.TouchableOpacity`
  position: absolute;
  padding-top: 8;
  padding-bottom: 8;
  padding-left: 8;
  padding-right: 8;
  right: -8;
  top: -10;
`;

const CloseIcon = styled(Icon).attrs({
  name: 'close-circle-outline',
  size: 20,
  color: 'rgba(255, 255, 255, 0.3)',
})``;

export default ({ onPress }) => (
  <Touchable onPress={onPress}>
    <CloseIcon />
  </Touchable>
);
