import React, { Component } from 'react';
import styled from 'styled-components/native';
import ContainerWithMargins from '../../components/ContainerWithMargins';

const Container = styled(ContainerWithMargins).attrs({
  hasTop: true,
})`
  flex: 1;
`;

const StyledWebView = styled.WebView`
  flex: 1;
`;

class Web extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  render() {
    const { navigation } = this.props;
    const { url, onMessage } = navigation.state.params;

    return (
      <Container>
        <StyledWebView
          source={{ uri: url }}
          domStorageEnabled
          scalesPageToFit={false}
          onMessage={onMessage}
        />
      </Container>
    );
  }
}

export default Web;
