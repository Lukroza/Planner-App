import * as React from 'react';
import { Button } from 'react-native-paper';

const ButtonComp = ({text, onPress}) => (
  <Button mode="contained" onPress={onPress }>
    {text}
  </Button>
);

export default ButtonComp;