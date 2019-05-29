import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import TotalAssets from './TotalAssets';
import CoinTypes from './CoinTypes';
import SectionHeader from './Section/SectionHeader';
import SectionLabel from './Section/SectionLabel';
import CreateWallet from './CreateWallet';
import ImportWallet from './ImportWallet';
import BackupWallet from './BackupWallet';
import PurchasedProducts from './PurchasedProducts';
import Products from './Products';
import HideBankButton from './HideBankButton';
import TradingPasswordModal from './TradingPasswordModal';
import EnableBankModal from './EnableBankModal';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import HomeBackgroundImage from '../../components/HomeBackgroundImage';
import {
  getCurrentWallet,
  getCoinTypes,
  getProducts,
  getPurchasedProducts,
  getExchangeRate,
  isAssetVisible,
  isBankVisible,
  isForeground,
  isSignedIn,
  hasTradingPassword,
  isUnauthorized,
} from '../../reducers';
import {
  subscribeToWallet,
  fetchWallet,
  fetchExchangeRate,
} from '../../reducers/wallets';
import {
  fetchProducts,
  fetchPurchasedProducts,
  subscribeToBank,
} from '../../reducers/bank';
import {
  toggleAssetVisibility,
  setBankVisibility,
} from '../../reducers/system';
import { fetchAccountInformation } from '../../reducers/account';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
  hasBottom: true,
})``;

const Section = styled.View``;

const Scrollable = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})`
  padding-bottom: 100;
  padding-left: 20;
  padding-right: 20;
`;

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'SignIn' }),
  ],
});

const mapStateToProps = state => ({
  wallet: getCurrentWallet(state),
  coinTypes: getCoinTypes(state),
  needToSetTradingPassword: !hasTradingPassword(state),
  products: getProducts(state),
  purchasedProducts: getPurchasedProducts(state),
  exchangeRate: getExchangeRate(state),
  signedIn: isSignedIn(state),
  isTotalAssetVisible: isAssetVisible(state),
  isBankProductsVisible: isBankVisible(state),
  isForeground: isForeground(state),
  isExpired: isUnauthorized(state),
});

@connect(mapStateToProps)
class Wallets extends Component {
  state = {
    refreshing: false,
    isEnableBankModalVisible: false,
  }

  componentDidMount() {
    const { dispatch, wallet, signedIn } = this.props;

    dispatch(fetchExchangeRate());
    dispatch(fetchProducts());

    if (signedIn) {
      dispatch(subscribeToBank());
      this.checkStatus();
    }

    if (wallet) {
      dispatch(fetchWallet(wallet));
      dispatch(subscribeToWallet(wallet));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.isForeground && !this.props.isForeground) {
      dispatch(fetchExchangeRate());
      dispatch(fetchAccountInformation());
    }
  }

  componentDidUpdate() {
    const { signedIn } = this.props;

    if (signedIn) {
      this.checkStatus();
    }
  }

  onCoinTypePress = (coinType) => {
    this.props.navigation.navigate('Details', { coinType });
  }

  onWebMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data);
    this.props.navigation.navigate('BuyContract', message);
  }

  onToggleTotalAssetVisibility = () => {
    this.props.dispatch(toggleAssetVisibility());
  }

  onSetTradingPasswordPress = () => {
    this.props.navigation.navigate('SetTradingPassword');
  }

  onCreateWalletPress = () => {
    this.props.navigation.navigate('CreateWallet');
  }

  onImportWalletPress = () => {
    this.props.navigation.navigate('ImportWallet');
  }

  onRefresh = () => {
    const { dispatch, wallet, signedIn } = this.props;

    this.setState({ refreshing: true });

    const promises = [];

    if (wallet) {
      promises.push(dispatch(fetchExchangeRate()), dispatch(fetchWallet(wallet)));
    }

    if (signedIn) {
      promises.push(dispatch(fetchPurchasedProducts()));
    }

    Promise.all(promises).then(() => {
      this.setState({ refreshing: false });
    });
  }

  onBackupWalletPress = () => {
    this.props.navigation.navigate('BackupWallet');
  }

  onLogin = () => {
    this.props.navigation.navigate('SignIn');
  }

  onProductPress = (coinType) => {
    this.props.navigation.navigate('Product', { coinType });
  }

  onHideBankButtonPress = () => {
    this.setState({ isEnableBankModalVisible: true });
    this.props.dispatch(setBankVisibility(false));
  }

  onEnableBankModalPress = () => {
    this.setState({ isEnableBankModalVisible: false });
  }

  checkStatus = () => {
    const {
      navigation, isExpired,
    } = this.props;

    if (isExpired) {
      navigation.dispatch(resetAction);
    }
  }

  render() {
    const {
      wallet,
      coinTypes,
      products,
      purchasedProducts,
      exchangeRate,
      signedIn,
      isTotalAssetVisible,
      isBankProductsVisible,
      needToSetTradingPassword,
    } = this.props;
    const { isEnableBankModalVisible } = this.state;

    return (
      <HomeBackgroundImage>
        <Container>
          <Scrollable refreshControl={
            <RefreshControl
              tintColor="#FFFFFF"
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          >
            <TotalAssets
              coinTypes={coinTypes}
              purchasedProducts={isBankProductsVisible ? purchasedProducts : []}
              exchangeRate={exchangeRate}
              visible={isTotalAssetVisible}
              onToggle={this.onToggleTotalAssetVisibility}
            />
            {
              isBankProductsVisible &&
                <Section>
                  <SectionHeader>
                    <SectionLabel>银行</SectionLabel>
                    <HideBankButton onPress={this.onHideBankButtonPress} />
                  </SectionHeader>
                  {
                    signedIn ?
                      <PurchasedProducts
                        products={purchasedProducts}
                        exchangeRate={exchangeRate}
                        onProductPress={this.onProductPress}
                      /> :
                      <Products products={products} onLogin={this.onLogin} />
                  }
                </Section>
            }
            <Section>
              <SectionHeader>
                <SectionLabel>钱包</SectionLabel>
                {
                  wallet && wallet.password &&
                    <BackupWallet onPress={this.onBackupWalletPress} />
                }
              </SectionHeader>
              {
                wallet &&
                <CoinTypes
                  coinTypes={coinTypes}
                  exchangeRate={exchangeRate}
                  onCoinTypePress={this.onCoinTypePress}
                />
              }
              {
                !wallet &&
                  [
                    <CreateWallet key="create-wallet" onPress={this.onCreateWalletPress} />,
                    <ImportWallet key="import-wallet" onPress={this.onImportWalletPress} />,
                  ]
              }
            </Section>
          </Scrollable>
        </Container>
        <TradingPasswordModal
          isVisible={signedIn && needToSetTradingPassword}
          onConfirm={this.onSetTradingPasswordPress}
        />
        <EnableBankModal
          isVisible={isEnableBankModalVisible}
          onClose={this.onEnableBankModalPress}
          onConfirm={this.onEnableBankModalPress}
        />
      </HomeBackgroundImage>
    );
  }
}

export default Wallets;
