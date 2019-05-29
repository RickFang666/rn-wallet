import React, { Component } from 'react';
import styled from 'styled-components/native';
import SelectedWord from './SelectedWord';
import ShuffledWords from './ShuffledWords';
import Button from '../../components/Button';

const Container = styled.ScrollView`
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

const SelectedWords = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 4;
  background: rgba(187, 187, 187, 0.2);
  padding-top: 20;
  padding-bottom: 20;
  padding-left: 20;
  padding-right: 20;
  margin-top: 25;
  height: 183;
`;

const CompleteButton = styled(Button)`
  margin-top: 40;
  margin-bottom: 40;
`;

export default class ConfirmWords extends Component {
  state = {
    selectedMnemonic: [],
  }

  onSelectedWordPress = (word) => {
    this.setState({
      selectedMnemonic: this.state.selectedMnemonic.filter(item => item !== word),
    });
  }

  onWordPress = (word) => {
    this.setState({ selectedMnemonic: [...this.state.selectedMnemonic, word] });
  }

  render() {
    const { mnemonic, onCompletePress } = this.props;
    const { selectedMnemonic } = this.state;

    return (
      <Container>
        <Title>确认你的钱包助记词</Title>
        <Description>请按顺序点击助记词，以确认你的备份助记词正确</Description>
        <SelectedWords>
          { selectedMnemonic.map(word =>
            <SelectedWord key={word} word={word} onPress={this.onSelectedWordPress} />) }
        </SelectedWords>
        <ShuffledWords
          mnemonic={mnemonic}
          selectedMnemonic={selectedMnemonic}
          onWordPress={this.onWordPress}
        />
        <CompleteButton
          title="完成"
          onPress={onCompletePress}
          disabled={selectedMnemonic.join(' ') !== mnemonic}
        />
      </Container>
    );
  }
}
