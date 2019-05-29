import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import Close from './Close';

const Container = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;

const Header = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 14;
  padding-bottom: 14;
  padding-left: 14;
  padding-right: 14;
  background: #FFFFFF;
  position: relative;
  border-bottom-width: 1;
  border-bottom-color: #E7E7E7;
`;

const Title = styled.Text`
  font-size: 16;
  color: #333333;
`;

const Content = styled.View`
  display: flex;
  justify-content: center;
  background: #FFFFFF;
  padding-top: 30;
  padding-bottom: 30;
  padding-left: 30;
  padding-right: 30;
`;

export default ({
  title, isVisible, onClose, children,
}) => (
  <Container avoidKeyboard isVisible={isVisible} onBackdropPress={onClose}>
    <Header>
      <Close onPress={onClose} />
      <Title>{ title }</Title>
    </Header>
    <Content>
      { children }
    </Content>
  </Container>
);
