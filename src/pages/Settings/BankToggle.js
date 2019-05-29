import React from 'react';
import { Switch } from 'react-native';
import { Entry } from '../../components/Settings';

export default ({ enabled, onToggle }) => (
  <Entry title="显示银行">
    <Switch value={enabled} onValueChange={onToggle} />
  </Entry>
);
