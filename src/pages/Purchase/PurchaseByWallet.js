import React, { Component } from 'react';
import styled from 'styled-components/native';
import AmountInput from './AmountInput';
import Logo from '../../components/Logo';
import FeeSelector from '../../components/FeeSelector';
import FormattedValue, { denormalizeValue } from '../../components/FormattedValue';
import Button from '../../components/Button';

const Container = styled.View``;

const Panel = styled.View`
  background: #FFFFFF;
  padding-top: 25;
  padding-bottom: 25;
  padding-left: 30;
  padding-right: 30;
  margin-top: 10;
  margin-bottom: 40;
`;

const StyledLogo = styled(Logo)`
  align-self: center;
  margin-bottom: 20;
`;

const Unit = styled.Text`
  font-size: 16;
  color: rgba(51, 51, 51, 0.6);
`;

const Description = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10;
`;

const Total = styled.Text`
  font-size: 14;
  color: rgba(51, 51, 51, 0.3);
`;

const TransferAllButton = styled.TouchableOpacity``;

const TransferAllLabel = styled.Text`
  font-size: 14;
  color: #CFAF81;  
`;

const PurchaseButton = styled(Button)`
  margin-left: 30;
  margin-right: 30;
`;

class PurchaseByWallet extends Component {
  state = {
    rawAmount: '',
  }

  onAmountChange = (rawAmount) => {
    const { coinType, onAmountChange } = this.props;

    onAmountChange(denormalizeValue(coinType, rawAmount));
    this.setState({ rawAmount });
  }

  onTransferAll = rawAmount => () => {
    const { onAmountChange } = this.props;

    onAmountChange(this.props.balance.balance);
    this.setState({ rawAmount });
  }

  onFeeChange = (feePreference) => {
    this.props.onFeePreferenceChange(feePreference);
  }

  render() {
    const {
      coinType, fees, balance, onPurchasePress,
    } = this.props;
    const { rawAmount } = this.state;

    return (
      <Container>
        <Panel>
          <StyledLogo coinType={coinType} size={60} />
          <AmountInput value={rawAmount} onChange={this.onAmountChange}>
            <Unit>{ coinType }</Unit>
          </AmountInput>
          <FormattedValue coinType={coinType} value={balance}>
            { formattedValue => (
              <Description>
                <Total>{ `可用数量为${formattedValue}，` }</Total>
                <TransferAllButton onPress={this.onTransferAll(formattedValue)}>
                  <TransferAllLabel>全部转出</TransferAllLabel>
                </TransferAllButton>
              </Description>
            ) }
          </FormattedValue>
          <FeeSelector
            coinType={coinType}
            high={fees.high}
            medium={fees.medium}
            low={fees.low}
            onChange={this.onFeeChange}
          />
        </Panel>
        <PurchaseButton title="转入" onPress={onPurchasePress} />
      </Container>
    );
  }
}

export default PurchaseByWallet;
