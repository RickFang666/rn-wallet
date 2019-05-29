import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import ContainerWithMargins from '../../components/ContainerWithMargins';
import CoinType from './CoinType';
import Address from './Address';
import { Entries, Entry } from '../../components/Settings';
import {
  getAddressBookCoinTypes,
  getAddresses,
} from '../../reducers';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
  hasBottom: true,
})`
  display: flex;
  background: #F2F2F2;
`;

const CoinTypes = styled.View`
  display: flex;
  flex-direction: row;
  background: #FFFFFF;
`;

const mapStateToProps = state => ({
  coinTypes: getAddressBookCoinTypes(state),
  addresses: getAddresses('ETH', state),
});

@connect(mapStateToProps)
class AddressBook extends Component {
  state = {
    selectedCoinType: this.props.coinTypes[0] || 'BTC',
  }

  render() {
    const { selectedCoinType } = this.state;
    const { coinTypes, addresses } = this.props;

    return (
      <Container>
        <CoinTypes>
          {
            coinTypes.map(coinType => (
              <CoinType
                key={coinType}
                name={coinType}
                selected={selectedCoinType === coinType}
              />
            ))
          }
        </CoinTypes>
        <Entries>
          {
            addresses.map(address => (
              <Entry key={address}>
                <Address address={address} />
              </Entry>
            ))
          }
        </Entries>
      </Container>
    );
  }
}

export default AddressBook;
