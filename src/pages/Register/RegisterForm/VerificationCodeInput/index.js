import React from 'react';
import SendButton from './SendButton';
import TextInput from '../TextInput';

export default ({
  value, disabled, onSend, onChange,
}) => (
  <TextInput value={value} placeholder="请输入验证码" type="numeric" onChange={onChange} disabled={disabled}>
    <SendButton onPress={onSend} />
  </TextInput>
);
