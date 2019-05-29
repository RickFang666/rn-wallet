import React from 'react';
import styled from 'styled-components/native';
import Product from './Product';
import CallToAction from './CallToAction';

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: rgba(117, 117, 117, 0.2);
  border-radius: 6;
  height: 110;
  padding-left: 20;
  padding-right: 20;
  margin-bottom: 10;
`;

const Columns = styled.View`
  flex-direction: row;
`;

export default ({ products, onLogin }) => (
  <Container onPress={onLogin}>
    <Columns>
      {
        products.map(product =>
          (<Product
            key={product.id}
            coinType={product.currency}
            rate={product.interest}
          />))
      }
      <CallToAction />
    </Columns>
  </Container>
);
