import * as React from 'react';
import { Button } from 'react-native-paper';

const ButtonComp = ({text}) => (
  <Button mode="contained" onPress={() => console.log('Pressed')}>
    {text}
  </Button>
);

export default ButtonComp;