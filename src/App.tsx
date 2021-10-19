import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import configureStore from './store';
import Main from './components/Main/Main';
import WebviewPage from './components/common/WebviewPage';
import { initLocale } from './actions/LocaleActions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/Constants';

const store = configureStore();
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    initLocale();
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
            <Stack.Screen name="WebviewPage" component={WebviewPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  }
});

export default App;
