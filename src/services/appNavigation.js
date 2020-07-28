import {createStackNavigator, StackViewTransitionConfigs} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import MainLoading from '../screens/MainLoading';
import HomeScreen from '../screens/HomeScreen';
import SignupScreen from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';
import TabScreen from '../screens/TabScreen';
import InformationScreen from '../screens/InformationScreen';
import RTISubmitScreen from '../screens/RTISubmitScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import DrawerScreen from '../screens/DrawerScreen';
import AcceptedScreen from '../screens/AcceptedScreen';
import ApplyScreen from '../screens/ApplyScreen';
import KnowledgeScreen from '../screens/KnowladgeScreen';
import PendingScreen from '../screens/RequestScreen';
import CompletedScreen from '../screens/CompletedScreen';
import RejectedScreen from '../screens/RejectedScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import RequestInformationScreen from '../screens/RequestInformationScreen';

import styles from './Styles/NavigationStyles';

const IOS_MODAL_ROUTES = ['ProfileScreen','SearchScreen', 'SettingsScreen', 'NotificationScreen', 'DrawerScreen'];

let dynamicModalTransition = (transitionProps, prevTransitionProps) => {
  const isModal = IOS_MODAL_ROUTES.some(
    screenName =>
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
  );
  return StackViewTransitionConfigs.defaultTransitionConfig(
    transitionProps,
    prevTransitionProps,
    isModal
  );
};

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
    {
        MainLoading: {screen: MainLoading},
        SignupScreen: {screen: SignupScreen},
        SigninScreen: {screen: SigninScreen},
        TabScreen: {screen: TabScreen},
        InformationScreen: {screen: InformationScreen},
        RTISubmitScreen: {screen: RTISubmitScreen},
        ProfileScreen: {screen: ProfileScreen},
        SearchScreen: {screen: SearchScreen},
        DrawerScreen: {screen: DrawerScreen},
        AcceptedScreen: {screen: AcceptedScreen},
        ApplyScreen: {screen: ApplyScreen},
        KnowledgeScreen: {screen: KnowledgeScreen},
        PendingScreen: {screen: PendingScreen},
        CompletedScreen: {screen: CompletedScreen},
        RejectedScreen: {screen: RejectedScreen},
        HomeScreen: {screen: HomeScreen},
        SettingsScreen: {screen: SettingsScreen},
        NotificationScreen: {screen: NotificationScreen},
        RequestInformationScreen: {screen: RequestInformationScreen},
    },
  {
    // Default config for all screens
    initialRouteName: 'MainLoading',
    transitionConfig: dynamicModalTransition,
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

export default createAppContainer(PrimaryNav);
