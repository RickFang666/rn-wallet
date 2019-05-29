import React, { Component } from 'react';
import styled from 'styled-components/native';
import MailAddressInput from './MailAddressInput';
import PhoneNumberInput from './PhoneNumberInput';
import VerificationCodeInput from './VerificationCodeInput';
import REGISTERATION_TYPE from '../registerationType';
import Button from '../../../components/Button';
import Agreement from '../../../components/Agreement';

const NextStepButton = styled(Button).attrs({
  disabled: ({ disabled }) => disabled,
})`
  margin-top: 60;
`;

const Form = styled.View`
  margin-top: 40;
`;

export default class RegisterForm extends Component {
  state = {
    username: '',
    verificationCode: '',
    agreed: true,
  }

  onAddressChange = username => this.setState({ username })

  onVerificationCodeChange = verificationCode => this.setState({ verificationCode })

  onAgreementChange = agreed => this.setState({ agreed })

  onVerificationCodeSend = () => {
    const { username } = this.state;

    this.props.sendVerificationCode(username);
  }

  onNextStepButtonPress = () => {
    const { username, verificationCode } = this.state;
    this.props.onSubmit({ username, verificationCode });
  }

  verifyInputs = () => {
    const { username, verificationCode, agreed } = this.state;

    return !!(username.length &&
          verificationCode.length &&
          agreed);
  }

  render() {
    const { type } = this.props;
    const { username, verificationCode, agreed } = this.state;
    const isVerified = this.verifyInputs();

    return (
      <Form>
        {
          type === REGISTERATION_TYPE.mail &&
            <MailAddressInput onChange={this.onAddressChange} value={username} />
        }
        {
          type === REGISTERATION_TYPE.mobile &&
            <PhoneNumberInput onChange={this.onAddressChange} value={username} />
        }
        <VerificationCodeInput
          onChange={this.onVerificationCodeChange}
          onSend={this.onVerificationCodeSend}
          disabled={username.length === 0}
          value={verificationCode}
        />
        <Agreement checked={agreed} onChange={this.onAgreementChange} theme="dark" />
        <NextStepButton title="下一步" onPress={this.onNextStepButtonPress} disabled={!isVerified} />
      </Form>
    );
  }
}
