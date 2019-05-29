import React, { Component } from 'react';
import styled from 'styled-components/native';
import { normalizeValue } from '../../components/FormattedValue';

const Container = styled.View`
`;

const Fee = styled.Text`
  font-size: 14;
  color: #D2B487;
  align-self: center;
  margin-top: 30;
`;

const FeeSlider = styled.Slider.attrs({
  thumbTintColor: '#D2B487',
  minimumTrackTintColor: '#D2B487',
})`
  margin-top: 12;
`;

const FeeLabels = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10;
`;

const Label = styled.Text`
  font-size: 14;
  color: #999999;
`;

export default class FeeSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fee: this.props.medium,
    };
  }

  onValueChange = (value) => {
    const { high, medium, low } = this.props;
    const fee = [low, medium, high][value];

    this.setState({ fee });
    this.props.onChange(value);
  }

  render() {
    const { coinType } = this.props;
    const { fee } = this.state;

    return (
      <Container>
        <Fee>{ `${normalizeValue(coinType, fee).toFixed(10)}${coinType}` }</Fee>
        <FeeSlider
          maximumValue={2}
          value={1}
          step={1}
          onValueChange={this.onValueChange}
        />
        <FeeLabels>
          <Label>最低</Label>
          <Label>推荐</Label>
          <Label>最高</Label>
        </FeeLabels>
      </Container>
    );
  }
}
