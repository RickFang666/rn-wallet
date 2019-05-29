import React from 'react';
import Option from '../Option';

export default ({ active, onPress }) => <Option icon={require('./mail.png')} label="邮箱注册" active={active} onPress={onPress} />;
