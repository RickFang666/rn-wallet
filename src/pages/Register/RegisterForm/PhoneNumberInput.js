import React from 'react';
import TextInput from './TextInput';

export default ({ value, onChange }) => <TextInput placeholder="手机号码" type="phone-pad" onChange={onChange} value={value} />;
