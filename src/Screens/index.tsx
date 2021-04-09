import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppStack from './AppNavigator';

const Stack = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};
export default Stack;
