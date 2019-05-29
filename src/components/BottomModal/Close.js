import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const CloseButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4;
  padding-bottom: 4;
  padding-left: 4;
  padding-right: 4;
  position: absolute;
  left: 14;
  top: 5;
`;

export default ({ onPress }) => (
  <CloseButton onPress={onPress}>
    <Icon name="ios-close" size={30} color="#BBBBBB" />
  </CloseButton>
);
