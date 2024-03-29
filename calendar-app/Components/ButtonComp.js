import * as React from 'react';
import { Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { GlobalBorderColor, GlobalColor, GlobalFont, GlobalSecondaryColor, GlobalTextColor } from '../Styles';

const ButtonComp = ({text, onPress}) => (
  <Button style={styles.buttonStyle} mode="contained" onPress={onPress }>
    {text}
  </Button>
);

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: GlobalSecondaryColor,
    width: '50%',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: GlobalBorderColor,
  },
});

export default ButtonComp;