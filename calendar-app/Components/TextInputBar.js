import * as React from 'react';
import { TextInput } from 'react-native-paper';

const TextInputBar = ({ label, onChangeText }) => {
  return (
    <TextInput
      label={label}
      onChangeText={onChangeText}
    />
  );
};

export default TextInputBar;
