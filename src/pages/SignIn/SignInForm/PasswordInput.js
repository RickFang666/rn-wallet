import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconTextInput from './IconTextInput';

const LockIcon = styled(Icon).attrs({
  name: 'lock',
  size: 20,
  color: '#CFAF81',
})`
  padding-left: 12;
  padding-right: 30;
`;

export default ({ onChange }) => <IconTextInput icon={<LockIcon />} placeholder="密码" secure onChange={onChange} />;
