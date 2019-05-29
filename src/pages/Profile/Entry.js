import React from 'react';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Icon = styled(MaterialCommunityIcons).attrs({
  name: ({ name }) => name,
  size: 20,
  color: '#CFAF81',
})`
  margin-right: 20;
`;

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 25;
  padding-bottom: 25;
  padding-left: 20;
  padding-right: 20;
`;

const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;  
`;

const Title = styled.Text`
  font-size: 16;
  color: #D7D7D7;
`;

const RightIcon = styled(FontAwesome).attrs({
  name: 'chevron-right',
  size: 14,
  color: '#818181',
})`
  align-self: flex-end;
`;

export default ({ title, icon, onPress }) => (
  <Container onPress={onPress}>
    <Left>
      <Icon name={icon} />
      <Title>{ title }</Title>
    </Left>
    <RightIcon />
  </Container>
);
