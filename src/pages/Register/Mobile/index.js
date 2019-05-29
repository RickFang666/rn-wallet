import React from 'react';
import Option from '../Option';

export default ({ active, onPress }) => <Option icon={require('./mobile.png')} label="手机注册" active={active} onPress={onPress} />;
