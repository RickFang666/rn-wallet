import React from 'react';
import TextInput from './TextInput';

export default ({ value, onChange, children }) => (
  <TextInput value={value} placeholder="转账金额" onChange={onChange}>
    { children }
  </TextInput>
);
