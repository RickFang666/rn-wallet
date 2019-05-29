import React from 'react';
import TextInput from './TextInput';

export default ({ value, placeholder, onChange }) => (
  <TextInput placeholder={placeholder} onChange={onChange} value={value} />
);
