import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import ConfirmationModal from './ConfirmationModal';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import CoinsLogo from '../../components/CoinsLogo';
import Button from '../../components/Button';
import { getCurrentWallet } from '../../reducers';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
  hasBottom: true,
})`
  flex: 1;
  justify-content: center;
  padding-left: 30;
  padding-right: 30;
  background: #FFFFFF;
`;

const Title = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: #333333;
  margin-top: 50;
  align-self: center;
`;

const Description = styled.Text`
  font-size: 14;
  line-height: 26;
  color: rgba(51, 51, 51, 0.6);
  margin-top: 20;
`;

const ActionButton = styled(Button)`
  margin-top: 40;
`;

const mapStateToProps = state => ({
  wallet: getCurrentWallet(state),
});

@connect(mapStateToProps)
class BackupWallet extends Component {
  state = {
    confirmed: false,
    failed: false,
  }

  onBackupPress = () => {
    this.setState({ confirmed: true });
  }

  onPasswordConfirmPress = (password) => {
    this.setState({ failed: false });
    if (password === this.props.wallet.password) {
      this.closeModal();
      this.props.navigation.navigate('MnemonicWords');
    } else {
      this.setState({ failed: true });
    }
  }

  closeModal = () => {
    this.setState({ confirmed: false });
  }

  render() {
    const { confirmed, failed } = this.state;

    return (
      <Container>
        <CoinsLogo />
        <Title>立即备份你的钱包！</Title>
        <Description>导出“助记词”并抄写到安全的地方，千万不要保存到网络上。然后可进行转出、转入的使用。</Description>
        <ActionButton title="备份钱包" onPress={this.onBackupPress} />
        <ConfirmationModal
          title="备份钱包"
          isVisible={confirmed}
          showWarning={failed}
          onConfirm={this.onPasswordConfirmPress}
          onClose={this.closeModal}
        />
      </Container>
    );
  }
}

export default BackupWallet;
