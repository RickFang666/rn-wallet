import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 60;
  padding-left: 30;
  padding-right: 30;
`;

const Title = styled.Text`
  font-size: 16;
  color: #333333;
`;

const Right = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Value = styled.Text`
  font-size: 16;
  color: #666666;
`;

const ChevronIcon = styled(Icon).attrs({
  name: 'chevron-thin-right',
  size: 14,
  color: '#BBBBBB',
})`
  align-self: flex-end;
`;

export default ({
  title, value, chevron, onPress, children,
}) => (
  <Container onPress={onPress}>
    <Title>{ title }</Title>
    <Right>
      { children }
      <Value>{ value }</Value>
      { chevron && <ChevronIcon />}
    </Right>
  </Container>
);
