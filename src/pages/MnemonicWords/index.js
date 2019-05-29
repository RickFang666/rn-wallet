import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import MemorizeWords from './MemorizeWords';
import ConfirmWords from './ConfirmWords';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import { getCurrentWallet } from '../../reducers';
import { backupWallet } from '../../reducers/wallets';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
})`
  flex: 1;
  background: #FFFFFF;
`;

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
  ],
});

const mapStateToProps = state => ({
  wallet: getCurrentWallet(state),
});

@connect(mapStateToProps)
class MnemonicWords extends Component {
  state = {
    memorized: false,
  }

  onNextStepPress = () => {
    this.setState({ memorized: true });
  }

  onCompletePress = () => {
    const { wallet, dispatch, navigation } = this.props;

    navigation.dispatch(resetAction);
    dispatch(backupWallet(wallet));
  }

  render() {
    const { mnemonic } = this.props.wallet;
    const { memorized } = this.state;

    return (
      <Container>
        {
          !!mnemonic &&
          memorized ?
            <ConfirmWords mnemonic={mnemonic} onCompletePress={this.onCompletePress} /> :
            <MemorizeWords mnemonic={mnemonic} onNextStepPress={this.onNextStepPress} />
        }
      </Container>
    );
  }
}

export default MnemonicWords;
