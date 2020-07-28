import React, { Component } from 'react';
import { View, Image, Text, KeyboardAvoidingView, Keyboard, Modal, Alert, AsyncStorage, Linking } from 'react-native';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import {
    Container,
    Header,
    Left,
    Right,
    Button as Btn
} from "native-base";
import { Feather, Octicons } from '@expo/vector-icons';
import { Button, Input } from 'react-native-elements';
import AnimatedLoader from 'react-native-animated-loader';
import NavigationService from '../services/navigation';
import { Images, ApplicationStyles as Main } from '../theme';
import styles from './Styles/HomeScreen';
import { Colors } from '../theme';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions
import i18n from 'i18n-js';


let userUpdateData = {};

class DrawerScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            emailErr: '',
            isEdit: false,
            name: '',
            email: '',
            lastName: '',
            firstName: '',
            address: '',
            loadingData: false
        }
    }
    onLogout = () => {
        AsyncStorage.clear();
        NavigationService.navigate('SigninScreen')
    }

    componentDidMount() {
        const { data, loading } = this.props;
        // console.log(data)
        // this.onProfileLoadHandler();
        // // console.log(data)
        if (!this.props.data.user) {
            this.onProfileLoadHandler();
            this.setState({
                loadingData: true
            })
        } else {
            this.setState({
                loadingData: false
            })
            this.setState({
                name: data.user.name,
                email: data.user.email,
                lastName: data.user.last_name,
                firstName: data.user.first_name,
                address: data.user.user_address1,
            })
        }
    }

    /**
     * check email validation
     * @param {*} text
     */
    emailValidation(text) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({
                emailErr: 'Enter a valid email address.'
            })
            return false;
        }
        else {
            this.setState({
                emailErr: ''
            })
            return true;
        }
    }

    render() {
        const { goBack } = this.props.navigation;
        const { data, loading } = this.props;
        return (
            <Container style={{ backgroundColor: '#B3E5FF'}}>
                <Header style={[{ backgroundColor: Colors.blue, borderBottomWidth: 0}]} noShadow>

                    <Right>
                        <Btn transparent icon
                             onPress={() => {
                                 goBack()
                             }}
                        >
                            <Feather name="x" size={RF(3)} color='#FFFFFF' />
                        </Btn>
                    </Right>
                </Header>
                <AnimatedLoader
                    visible={this.state.loadingData}
                    overlayColor="rgba(0,0,0,0.35)"
                    source={Images.animatedLoader}
                    animationStyle={Main.lottie}
                    speed={1}
                />
                <View style={[Main.screen.screenTitleSectionDrawer]} >
                    <Text style={[Main.screen.screenTitle]}>Quick Access</Text>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding:10}}>
                    <View style={{ width: '50%', textAlign:'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('HomeScreen');
                            }}
                        >

                            <View style={[styles.itemCardOuterDrawer]}>
                                <View style={[styles.itemCardDrawer, Main.shadow]}>
                                    <Text style={{ color: '#FFFFFF', shadowColor:'black', fontSize: 13, textShadowColor:'#585858', textShadowOffset:{width: 5, height: 5}, textShadowRadius:10, textAlign:'center'}}>
                                        <Feather name="archive" size={RF(1.5)} color='#FFFFFF' style={{ padding: 100}} /> {i18n.t('Home')} </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('ApplyScreen')
                            }}
                        >
                            <View style={[styles.itemCardOuterDrawer]}>
                                <View style={[styles.itemCardDrawer, Main.shadow]}>
                                    <Text style={{ color: '#FFFFFF', shadowColor:'black', fontSize: 13, textShadowColor:'#585858', textShadowOffset:{width: 5, height: 5}, textShadowRadius:10}}><Feather name="tag" size={RF(1.5)} color='#FFFFFF' /> {i18n.t('New RTI Request')} </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{  flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding:10}}>
                    <Text style={{ fontSize:20, fontWeight:'bold' }}>Your RTI Requests</Text>
                </View>
                <View style={{  flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding:10}}>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('PendingScreen')
                            }}
                        >

                            <View style={[styles.itemCardOuterDrawer]}>
                                <View style={[styles.itemCardDrawer, Main.shadow]}>
                                    <Text style={{ color: '#FFFFFF', shadowColor:'black', fontSize: 13, textShadowColor:'#585858', textShadowOffset:{width: 5, height: 5}, textShadowRadius:10}}><Feather name="activity" size={RF(1.5)} color='#FFFFFF' style={{ padding: 100}} /> {i18n.t('Pending')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('AcceptedScreen')
                            }}
                        >
                            <View style={[styles.itemCardOuterDrawer]}>
                                <View style={[styles.itemCardDrawer, Main.shadow]}>
                                    <Text style={{ color: '#FFFFFF', shadowColor:'black', fontSize: 13, textShadowColor:'#585858', textShadowOffset:{width: 5, height: 5}, textShadowRadius:10}}><Feather name="check-circle" size={RF(1.5)} color='#FFFFFF' /> {i18n.t('Accepted')} </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding:10}}>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('RejectedScreen')
                            }}
                        >

                            <View style={[styles.itemCardOuterDrawer]}>
                                <View style={[styles.itemCardDrawer, Main.shadow]}>
                                    <Text style={{ color: '#FFFFFF', shadowColor:'black', fontSize: 13, textShadowColor:'#585858', textShadowOffset:{width: 5, height: 5}, textShadowRadius:10}}><Feather name="thumbs-down" size={RF(1.5)} color='#FFFFFF' style={{ padding: 100}} /> {i18n.t('Rejected')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('CompletedScreen')
                            }}
                        >
                            <View style={[styles.itemCardOuterDrawer]}>
                                <View style={[styles.itemCardDrawer, Main.shadow]}>
                                    <Text style={{ color: '#FFFFFF', shadowColor:'black', fontSize: 13, textShadowColor:'#585858', textShadowOffset:{width: 5, height: 5}, textShadowRadius:10}}><Feather name="thumbs-up" size={RF(1.5)} color='#FFFFFF' /> {i18n.t('Completed')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{  flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding:10}}>
                    <Text style={{ fontSize:20, fontWeight:'bold' }}>Others</Text>
                </View>

                <View style={{  flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding:10}}>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('KnowledgeScreen')
                            }}
                        >

                            <View style={[styles.itemCardOuterDrawer]}>
                                <View style={[styles.itemCardDrawer, Main.shadow]}>
                                    <Text style={{ color: '#FFFFFF', shadowColor:'black', fontSize: 13, textShadowColor:'#585858', textShadowOffset:{width: 5, height: 5}, textShadowRadius:10}}><Feather name="book-open" size={RF(1.5)} color='#FFFFFF' style={{ padding: 100}} />  {i18n.t('Knowledge Base')} </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity
                            onPress={() => Linking.openURL('https://rtionline.gov.lk')}
                        >
                            <View style={[styles.itemCardOuterDrawer]}>
                                <View style={[styles.itemCardDrawer, Main.shadow]}>
                                    <Text style={{ color: '#FFFFFF', shadowColor:'black', fontSize: 13, textShadowColor:'#585858', textShadowOffset:{width: 5, height: 5}, textShadowRadius:10}}><Feather name="phone-call" size={RF(1.5)} color='#FFFFFF' />  {i18n.t('Contact Us')} </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{   flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding:10}}>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('ProfileScreen')
                            }}
                        >

                            <View style={[styles.itemCardOuterDrawer]}>
                                <View style={[styles.itemCardDrawer, Main.shadow]}>
                                    <Text style={{ color: '#FFFFFF', shadowColor:'black', fontSize: 13, textShadowColor:'#585858', textShadowOffset:{width: 5, height: 5}, textShadowRadius:10}}><Feather name="settings" size={RF(1.5)} color='#FFFFFF' style={{ padding: 100}} /> {i18n.t('Settings')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.onLogout();
                            }}
                        >
                            <View style={[styles.itemCardOuterDrawer]}>
                                <View style={[styles.itemCardDrawer, Main.shadow]}>
                                    <Text style={{ color: '#FFFFFF', shadowColor:'black', fontSize: 13, textShadowColor:'#585858', textShadowOffset:{width: 5, height: 5}, textShadowRadius:10}}><Feather name="power" size={RF(1.5)} color='#FFFFFF' /> {i18n.t('Logout')}  </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>



            </Container>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.userDetailsDataReducer.loading,
        data: state.userDetailsDataReducer.data,
        error: state.userDetailsDataReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DrawerScreen);
