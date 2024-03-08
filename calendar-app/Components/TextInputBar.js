import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { GlobalColor, GlobalFont, GlobalSecondaryColor, GlobalTextColor } from '../Styles';

const TextInputBar = ({ label, onChangeText }) => {
  return (
    <TextInput
      underlineColor ="transparent"
      label={label}
      onChangeText={onChangeText}
      style={styles.textBar}
      textColor= {GlobalTextColor}
    />
  );
};

const styles = StyleSheet.create({
  textBar: {
    backgroundColor: GlobalSecondaryColor,
    width: '90%',
    borderRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    overflow: 'hidden',
  },
});

export default TextInputBar;
