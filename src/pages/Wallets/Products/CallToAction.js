import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';

const Container = styled.View`
  flex: 1;
  opacity: 0.3;
  justify-content: center;
  align-items: flex-end;
`;

const Button = styled.View`
  flex-direction: row;
`;

const Label = styled.Text`
  font-size: 12;
  color: #FFFFFF;
`;

const ChevronIcon = styled(Icon).attrs({
  name: 'chevron-thin-right',
  size: 14,
  color: '#FFFFFF',
})`
  align-self: flex-end;
`;

export default () => (
  <Container>
    <Button>
      <Label>马上开通</Label>
      <ChevronIcon />
    </Button>
  </Container>
);
