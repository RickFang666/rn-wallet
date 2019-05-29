import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

const Container = styled.View`
  display: flex;
  flex: 1;
`;

const Label = styled.Text``;

export default class AddressScanner extends React.Component {
  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  onBarCodeRead = (result) => {
    this.props.navigation.state.params.onRead(result.data);
    this.props.navigation.goBack();
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Label>Requesting for camera permission</Label>;
    } else if (hasCameraPermission === false) {
      return <Label>No access to camera</Label>;
    }
    return (
      <Container>
        <BarCodeScanner
          onBarCodeRead={this.onBarCodeRead}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={StyleSheet.absoluteFill}
        />
      </Container>
    );
  }
}
