import React, { Component } from 'react';
import {View, StatusBar, AsyncStorage} from 'react-native';
import {
    Container,
    Header,
    Left,
    Right,
    Button
} from "native-base";
import { Feather, Octicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import { Colors } from '../theme';
import NavigationService from '../services/navigation';
import { Images, ApplicationStyles as Main } from '../theme';
import ProfileScreen from './ProfileScreen';
import DrawerScreen from './DrawerScreen';
import * as Device from 'expo-device';
import {
    heightPercentageToDP as hpstyle,
    widthPercentageToDP as wpstyle,
   } from 'react-native-responsive-screen'

const TabNavigator = createBottomTabNavigator({
    Home: {
        getScreen: () => require('./HomeScreen').default
    },
    Requests: {
        getScreen: () => require('./RequestScreen').default
    },
    Apply: {
        getScreen: () => require('./ApplyScreen').default
    },
    Accepted: {
        getScreen: () => require('./AcceptedScreen').default
    },
    Knowladge: {
        getScreen: () => require('./KnowladgeScreen').default
    }
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'Home') {
                    if(Device.modelName == 'iPad'){
                        return focused ?
                        <Feather name='home' color='#097FB4' size={RF(1.3)} /> :
                        <Feather name='home' color='#A5A5A5' size={RF(1)} />
                    }else{
                        return focused ?
                        <Feather name='home' color='#097FB4' size={RF(3)} /> :
                        <Feather name='home' color='#A5A5A5' size={RF(2.5)} />
                    }
                } else if (routeName === 'Requests') {
                    if(Device.modelName == 'iPad'){
                        return focused ?
                        <Feather name='zap' color='#097FB4' size={RF(1.3)} /> :
                        <Feather name='zap' color='#A5A5A5' size={RF(1)} />
                    }else{
                        return focused ?
                        <Feather name='zap' color='#097FB4' size={RF(3)} /> :
                        <Feather name='zap' color='#A5A5A5' size={RF(2.5)} />
                    }
                } else if (routeName === 'Apply') {
                    if(Device.modelName == 'iPad'){
                        return focused ?
                        <View style={{ height: HP(10), width: HP(10), backgroundColor: '#097FB4', borderRadius: HP(5), alignItems: 'center', justifyContent: 'center', top: -HP(2) }}><Feather name='plus' color='#FFFFFF' size={RF(6)} /></View> :
                        <View style={{ height: HP(10), width: HP(10), backgroundColor: '#5BC2F0', borderRadius: HP(5), alignItems: 'center', justifyContent: 'center', top: -HP(2) }}><Feather name='plus' color='#FFFFFF' size={RF(5)} /></View>
                    }else{
                        return focused ?
                        <View style={{ height: HP(10), width: HP(10), backgroundColor: '#097FB4', borderRadius: HP(5), alignItems: 'center', justifyContent: 'center', top: -HP(2) }}><Feather name='plus' color='#FFFFFF' size={RF(6)} /></View> :
                        <View style={{ height: HP(10), width: HP(10), backgroundColor: '#5BC2F0', borderRadius: HP(5), alignItems: 'center', justifyContent: 'center', top: -HP(2) }}><Feather name='plus' color='#FFFFFF' size={RF(5)} /></View>
                    }
                } else if (routeName === 'Accepted') {
                    if(Device.modelName == 'iPad'){
                        return focused ?
                        <Feather name='check-circle' color='#097FB4' size={RF(1.3)} /> :
                        <Feather name='check-circle' color='#A5A5A5' size={RF(1)} />
                    }else{
                        return focused ?
                        <Feather name='check-circle' color='#097FB4' size={RF(3)} /> :
                        <Feather name='check-circle' color='#A5A5A5' size={RF(2.5)} />
                    }
                } else if (routeName === 'Knowladge') {
                    if(Device.modelName == 'iPad'){
                        return focused ?
                        <Feather name='book-open' color='#097FB4' size={RF(1.3)} /> :
                        <Feather name='book-open' color='#A5A5A5' size={RF(1)} />
                    }else{
                        return focused ?
                        <Feather name='book-open' color='#097FB4' size={RF(3)} /> :
                        <Feather name='book-open' color='#A5A5A5' size={RF(2.5)} />
                    }
                }
            },
        }),
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            showLabel: false,
            headerMode: 'none',
            upperCaseLabel: false,
            inactiveTintColor: '#A5A5A5',
            activeTintColor: '#097FB4',
            style: {
                height: 60,
                // backgroundColor: '#5BC2F0'
            }
        },
        initialRouteName: 'Home'
    }
);

const TabNavi = createAppContainer(TabNavigator);

export default class TabScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            modalUserVisible: false,
            modalNotifiVisible: false,
            modalSettingsVisible: false,
        }
    }

    componentDidMount() { }
    onLogout = () => {
        AsyncStorage.clear();
        NavigationService.navigate('SigninScreen')
    }
    render() {
        return (
            <Container style={{ backgroundColor: Colors.offwhite }}>
                <StatusBar hidden />
                <Header style={[{ backgroundColor: Colors.blue, borderBottomWidth: 0, height: wpstyle('9%') },]} noShadow >
                    <Left>
                        <Button transparent icon
                            onPress={() => {
                                console.log("hit the drawer nav");
                                NavigationService.navigate('DrawerScreen')
                            }}
                        >
                           {Device.modelName == 'iPad' ? <Feather name="menu" size={RF(1.5)} color='#FFFFFF' />: <Feather name="menu" size={RF(2.6)} color='#FFFFFF' />}
                            
                        </Button>
                    </Left>
                    <Right>
                        {/*<Button transparent icon*/}
                        {/*    onPress={() => {*/}
                        {/*        NavigationService.navigate('NotificationScreen')*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <Feather name="bell" size={RF(3)} color='#FFFFFF' />*/}
                        {/*    <Octicons name="primitive-dot" size={RF(3)} style={[{ position: 'relative', top: -7, left: -12 }]} color='orange' />*/}
                        {/*</Button>*/}
                        <Button transparent icon
                            onPress={() => {
                                NavigationService.navigate('SearchScreen')
                            }}
                        >
                            {Device.modelName == 'iPad' ? <Feather name="search" size={RF(1.5)} color='#FFFFFF' />: <Feather name="search" size={RF(2.5)} color='#FFFFFF' />}
                            
                        </Button>

                        <Button transparent icon
                            onPress={() => {
                                NavigationService.navigate('ProfileScreen')
                            }}
                        >
                            {Device.modelName == 'iPad' ? <Feather name="settings" size={RF(1.5)} color='#FFFFFF' />: <Feather name="settings" size={RF(2.5)} color='#FFFFFF' />}
                            
                        </Button>
                        <Button transparent icon
                                onPress={() => {
                                    this.onLogout()
                                }}
                        >
                            {Device.modelName == 'iPad' ? <Feather name="power" size={RF(1.5)} color='#FFFFFF' />: <Feather name="power" size={RF(2.5)} color='#FFFFFF' />}
                            
                        </Button>
                    </Right>
                </Header>
                <TabNavi />
            </Container>
        )
    }
}