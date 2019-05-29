import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconTextInput from './IconTextInput';

const UserIcon = styled(Icon).attrs({
  name: 'user-o',
  size: 20,
  color: '#CFAF81',
})`
  padding-left: 12;
  padding-right: 30;
`;

export default ({ onChange }) => <IconTextInput icon={<UserIcon />} placeholder="手机或邮箱" onChange={onChange} />;
