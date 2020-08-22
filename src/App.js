/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AppNavigator from './navigator/AppNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';

export default App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)'}}>
      <AppNavigator />
    </SafeAreaView>
  );
};
