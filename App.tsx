import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from 'src/navigation/AuthNavigator';
import {Provider} from 'react-redux';
import sotre from 'src/store';
import AppNavigator from 'src/navigation';
import AppContainer from '@components/AppContainer';


const App = () => {
  return (
    <Provider store={sotre}>
      <AppContainer>
        <AppNavigator />
      </AppContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
