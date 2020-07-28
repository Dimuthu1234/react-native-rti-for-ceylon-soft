import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import * as Font from 'expo-font';
import PrimaryNav from './src/services/appNavigation';
import NavigationService from './src/services/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/stores'; //Import the store'

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    });
  }

  renderLoading = () => (
    <AnimatedLoader
      visible={true}
      overlayColor="rgba(255,255,255,0.75)"
      source={require('./assets/icons/loader.json')}
      animationStyle={{ height: 50, width: 50 }}
      speed={1}
    />
  );

  render() {
    return (

      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <PrimaryNav
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </PersistGate>
      </Provider>
    );
  }
}

console.disableYellowBox = true;
