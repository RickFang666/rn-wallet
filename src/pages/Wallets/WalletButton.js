import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: rgba(117, 117, 117, 0.2);
  border-radius: 6;
  height: 70;
  padding-left: 20;
  padding-right: 20;
  margin-bottom: 10;
`;

const Label = styled.Text`
  font-size: 16;
  color: #FFFFFF;
`;

const ChevronIcon = styled(Icon).attrs({
  name: 'chevron-thin-right',
  size: 14,
  color: '#BBBBBB',
})``;

export default ({ title, onPress }) => (
  <Container onPress={onPress}>
    <Label>{ title }</Label>
    <ChevronIcon />
  </Container>
);
