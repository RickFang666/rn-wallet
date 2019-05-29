import React from 'react';
import styled from 'styled-components/native';
import Button from '../../components/Button';

const Container = styled.View`
  padding-left: 30;
  padding-right: 30;
`;

const Title = styled.Text`
  font-size: 18;
  font-weight: bold;
  align-self: center;
  color: #333333;
  margin-top: 40;
`;

const Description = styled.Text`
  font-size: 13;
  line-height: 22;
  color: rgba(51, 51, 51, 0.6);
  margin-top: 25;
`;

const WordsSection = styled.View`
  border-radius: 4;
  background: rgba(187, 187, 187, 0.2);
  padding-top: 20;
  padding-bottom: 20;
  padding-left: 20;
  padding-right: 20;
  margin-top: 25;
`;

const Words = styled.Text`
  font-size: 16;
  line-height: 26;
  color: #333333;
`;

const NextStepButton = styled(Button)`
  margin-top: 40;
`;

export default ({ mnemonic, onNextStepPress }) => (
  <Container>
    <Title>抄下你的钱包助记词</Title>
    <Description>助记词用于恢复钱包或重置钱包密码，将它准确的抄写在纸上，并存放在只有你知道的安全地方</Description>
    <WordsSection>
      <Words>{ mnemonic }</Words>
    </WordsSection>
    <NextStepButton title="下一步" onPress={onNextStepPress} />
  </Container>
);
