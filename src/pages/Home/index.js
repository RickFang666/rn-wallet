import React from 'react';
import styled from 'styled-components/native';
import { TabNavigator } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Wallets from '../Wallets';
import Profile from '../Profile';

const WalletIcon = styled(SimpleLineIcons).attrs({
  name: 'wallet',
  size: 24,
  color: ({ color }) => color,
})``;

const ProfileIcon = styled(FontAwesome).attrs({
  name: 'user-o',
  size: 24,
  color: ({ color }) => color,
})``;

const headerTitleStyle = {
  width: '90%',
  textAlign: 'center',
  alignItems: 'center',
};

export default TabNavigator({
  Wallets: {
    screen: Wallets,
    navigationOptions: {
      title: '我的钱包',
      headerTitleStyle,
      tabBarIcon: ({ tintColor }) => <WalletIcon color={tintColor} />,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: '个人中心',
      headerTitleStyle,
      tabBarIcon: ({ tintColor }) => <ProfileIcon color={tintColor} />,
    },
  },
}, {
  lazy: false,
  tabBarOptions: {
    activeTintColor: '#EEC276',
    showLabel: false,
    showIcon: true,
    indicatorStyle: {
      backgroundColor: '#EEC276',
    },
    style: {
      backgroundColor: 'transparent',
      position: 'absolute',
      height: 50,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
});
