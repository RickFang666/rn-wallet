import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Touchable = styled.TouchableOpacity`
  padding-left: 8;
  padding-right: 8;
  padding-top: 8;
  padding-bottom: 8;
`;

const ScanIcon = styled(Icon).attrs({
  name: 'ios-qr-scanner',
  size: 25,
  color: '#CFAF81',
})`
  align-self: flex-end;
`;

export default ({ onPress }) => (
  <Touchable onPress={onPress}>
    <ScanIcon />
  </Touchable>
);
