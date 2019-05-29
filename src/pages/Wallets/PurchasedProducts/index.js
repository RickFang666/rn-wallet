import React from 'react';
import styled from 'styled-components/native';
import PurchasedProduct from './PurchasedProduct';

const Container = styled.View`
  flex-direction: row;
  margin-left: -5;
  margin-right: -5;
  margin-bottom: 20;
`;

export default ({ products, exchangeRate, onProductPress }) => (
  <Container>
    { products.map(product => (
      <PurchasedProduct
        key={product.currency}
        exchangeRate={exchangeRate}
        onPress={onProductPress}
        {...product}
      />
    )) }
  </Container>
);
