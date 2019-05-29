import React from 'react';
import TextInput from './TextInput';

export default ({ value, onChange }) => <TextInput placeholder="邮箱地址" type="email-address" onChange={onChange} value={value} />;
