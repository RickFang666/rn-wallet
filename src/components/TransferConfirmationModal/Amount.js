import React from 'react';
import styled from 'styled-components/native';
import FormattedValue from '../FormattedValue';

const Amount = styled.Text`
  font-size: 30;
  color: #333333;
  margin-bottom: 15;
  align-self: center;
`;

export default ({ coinType, value }) => (
  <FormattedValue coinType={coinType} value={value} unit>
    { formattedValue => <Amount>{ formattedValue }</Amount> }
  </FormattedValue>
);
