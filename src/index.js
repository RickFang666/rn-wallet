import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import styled from 'styled-components/native';
import configureStore from './configureStore';
import Home from './pages/Home';
import CreateWallet from './pages/CreateWallet';
import ImportWallet from './pages/ImportWallet';
import BackupWallet from './pages/BackupWallet';
import MnemonicWords from './pages/MnemonicWords';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import SetPassword from './pages/SetPassword';
import SetTradingPassword from './pages/SetTradingPassword';
import Details from './pages/Details';
import Receive from './pages/Receive';
import Transfer from './pages/Transfer';
import AddressScanner from './pages/AddressScanner';
import Web from './pages/Web';
import Transaction from './pages/Transaction';
import Settings from './pages/Settings';
import Account from './pages/Account';
import ChangeAddress from './pages/ChangeAddress';
import ChangePassword from './pages/ChangePassword';
import AddressBook from './pages/AddressBook';
import WalletSettings from './pages/WalletSettings';
import Product from './pages/Product';
import Purchase from './pages/Purchase';
import Withdraw from './pages/Withdraw';

const Container = styled.View`
  flex: 1;
`;

const headerStyle = {
  position: 'absolute',
  height: 50,
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: '#2A2A2A',
  borderBottomWidth: 0,
};

export const createRootNavigator = () => StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
    },
  },
  Register: {
    screen: Register,
  },
  SetPassword: {
    screen: SetPassword,
  },
  SetTradingPassword: {
    screen: SetTradingPassword,
    navigationOptions: {
      title: '设置交易密码',
      headerStyle,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      headerLeft: null,
      gesturesEnabled: false,
      headerStyle: {
        ...headerStyle,
        backgroundColor: '#262626',
      },
    },
  },
  CreateWallet: {
    screen: CreateWallet,
    navigationOptions: {
      title: '创建钱包',
      headerStyle,
    },
  },
  ImportWallet: {
    screen: ImportWallet,
    navigationOptions: {
      title: '导入钱包',
      headerStyle,
    },
  },
  BackupWallet: {
    screen: BackupWallet,
    navigationOptions: {
      title: '备份钱包',
      headerStyle,
    },
  },
  MnemonicWords: {
    screen: MnemonicWords,
    navigationOptions: {
      title: '备份助记词',
      headerStyle,
    },
  },
  Product: {
    screen: Product,
    navigationOptions: {
      headerStyle,
    },
  },
  Purchase: {
    screen: Purchase,
    navigationOptions: {
      title: '转入',
      headerStyle,
    },
  },
  Details: {
    screen: Details,
  },
  Transaction: {
    screen: Transaction,
    navigationOptions: {
      title: '交易详情',
      headerStyle,
    },
  },
  Receive: {
    screen: Receive,
    navigationOptions: {
      title: '转入',
      headerStyle,
    },
  },
  Transfer: {
    screen: Transfer,
    navigationOptions: {
      title: '转出',
      headerStyle,
    },
  },
  Withdraw: {
    screen: Withdraw,
    navigationOptions: {
      title: '转出',
      headerStyle,
    },
  },
  AddressScanner: {
    screen: AddressScanner,
    navigationOptions: {
      title: '扫描二维码',
    },
  },
  Account: {
    screen: Account,
    navigationOptions: {
      title: '账号管理',
      headerStyle,
    },
  },
  ChangeAddress: {
    screen: ChangeAddress,
    navigationOptions: {
      headerStyle,
    },
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      headerStyle,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: '系统设置',
      headerStyle,
    },
  },
  AddressBook: {
    screen: AddressBook,
    navigationOptions: {
      title: '常用地址',
      headerStyle,
    },
  },
  WalletSettings: {
    screen: WalletSettings,
    navigationOptions: {
      title: '钱包管理',
      headerStyle,
    },
  },
  Web: {
    screen: Web,
    navigationOptions: {
      headerStyle,
    },
  },
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: {
      ...headerStyle,
      backgroundColor: 'transparent',
    },
    headerTintColor: '#FFFFFF',
    headerBackTitle: null,
  },
});

const store = configureStore();

export default () => {
  const Layout = createRootNavigator();

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <Layout />
      </Provider>
    </Container>
  );
};
