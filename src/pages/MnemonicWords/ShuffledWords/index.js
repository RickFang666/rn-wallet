import React from 'react';
import styled from 'styled-components/native';
import shuffle from 'array-shuffle';
import Word from './Word';

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 30;
`;

export default ({ mnemonic, selectedMnemonic, onWordPress }) => (
  <Container>
    { shuffle(mnemonic.split(' ').map(word =>
      (<Word
        key={word}
        selected={selectedMnemonic.includes(word)}
        word={word}
        onPress={onWordPress}
      />))) }
  </Container>
);
