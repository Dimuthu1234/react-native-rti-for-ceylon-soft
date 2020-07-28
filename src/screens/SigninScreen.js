import React, { Component } from 'react';
import { View, Image, Text, KeyboardAvoidingView, Keyboard, StatusBar, Alert } from 'react-native';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import { StackActions, NavigationActions } from 'react-navigation';
import { Button, Input } from 'react-native-elements';
import NavigationService from '../services/navigation';
import { Images, ApplicationStyles as Main } from '../theme';
import styles from './Styles/SigninScreen';
import { Colors } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
// globle variables
import '../global';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { SocialIcon } from 'react-native-elements'
import i18n from 'i18n-js';


const resetMainAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'TabScreen' })],
  });


class SigninScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            email: 'jayalathdimuthu@gmail.com', // jayalathdimuthu@gmail.com
            password: '12345678',
            passwordErr: '',
            emailErr: '',
            isValid: false,
            isEmailValid: false,
            isLoading: false,
            socialData: null
        }
    }

    componentDidMount() {
        console.log('SigninScreen');
    }

    /**
     * onSignin - handle the registeration
     */
    onSignin(socialLogin = false) {
        if(socialLogin){
            // console.log('hey  this is social login')
            // console.log(this.state.socialData.name)
            // console.log(this.state.socialData.email)

            const formData = new FormData();
            formData.append('grant_type', global.grant_type);
            formData.append('client_id', global.client_id);
            formData.append('client_secret', global.client_secret);
            formData.append('username', this.state.email);
            formData.append('password', this.state.password);
            formData.append('socialLogin', true);
            formData.append('socialName', this.state.socialData.name);
    
            // console.log('form data -', formData)
    
            Keyboard.dismiss();
    
            this.setState({
                isLoading: true
            })
    
            this.props.userLogin(formData, (res) => {
    
                if (!res) {
                    this.setState({
                        emailErr: '',
                        passwordErr: '',
                        isLoading: false
                    })
    
                    Alert.alert('The user credentials were incorrect.');
    
                    this.keepDefaultHandler();
    
                } else {
                    this.setState({
                        emailErr: '',
                        passwordErr: '',
                        isLoading: false
                    })
                    this.props.navigation.dispatch(resetMainAction);
                }
            })

        }else{
            const formData = new FormData();
            formData.append('grant_type', global.grant_type);
            formData.append('client_id', global.client_id);
            formData.append('client_secret', global.client_secret);
            formData.append('username', this.state.email);
            formData.append('password', this.state.password);
            formData.append('socialLogin', false);
    
            console.log('form data -', formData)
    
            Keyboard.dismiss();
    
            this.setState({
                isLoading: true
            })
    
            this.props.userLogin(formData, (res) => {
    
                if (!res) {
                    this.setState({
                        emailErr: '',
                        passwordErr: '',
                        isLoading: false
                    })
    
                    Alert.alert('The user credentials were incorrect.');
    
                    this.keepDefaultHandler();
    
                } else {
                    this.setState({
                        emailErr: '',
                        passwordErr: '',
                        isLoading: false
                    })
                    this.props.navigation.dispatch(resetMainAction);
                }
            })
        }     
    }

    async loginFB() {
        try {
          await Facebook.initializeAsync('691089538332145');
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
            // console.log(await response.json());
            this.setState({
                socialData: await response.json(),
            })

            this.setState({
                email: this.state.socialData.email,
                password: '12345678'
            })
            this.onSignin(true);
            // this.setState({
            //     emailErr: '',
            //     passwordErr: '',
            //     isLoading: false
            // })
            // this.props.navigation.dispatch(resetMainAction);
            // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }


      async loginGoogle(){
        try {
            const result = await Google.logInAsync({
              androidClientId: '41365830293-rbvc13gnkaqm3vc9a6402r41e0sjoleg.apps.googleusercontent.com',
              iosClientId: '41365830293-dcpb6c2ucivpibb4viefal2naetepect.apps.googleusercontent.com',
              scopes: ['profile', 'email'],
            });
        
            if (result.type === 'success') {
                console.log(result.user)
                this.setState({
                    socialData: result.user,
                })
    
                this.setState({
                    email: this.state.socialData.email,
                    password: '12345678'
                })
                this.onSignin(true);
              return result.accessToken;
            } else {
              return { cancelled: true };
            }
          } catch (e) {
            return { error: true };
          }
      }

    /**
     * keep variable default
     */
    keepDefaultHandler() {
        setTimeout(() => {
            this.setState({
                emailErr: '',
                passwordErr: '',
                isLoading: false
            })
        }, 3000);
    }

    /**
     * onSignup - navigate to sign up screen
     */
    onSignup() {
        NavigationService.navigate('SignupScreen')
    }

    /**
     * validating the variables
     */
    validationHandler() {
        if ((this.emailValidate(this.state.email)) && (this.state.email != '' && this.state.password != '')) {
            this.setState({
                isValid: true
            })
        } else {
            this.setState({
                isValid: false
            })
        }

    }

    /**
     * check email validation
     * @param {*} text
     */
    emailValidate(text) {
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

    /**
 * check password matched
 */

    // checkPassword(text) {
    //     if (!(text.length >= 8)) {
    //         this.setState({
    //             passwordErr: 'Password must contain at least 8 characters!',
    //             isValid: false
    //         })
    //     } else {
    //         this.setState({
    //             passwordErr: '',
    //             isValid: true
    //         })
    //     }
    // }

    render() {
        return (
            <View style={[Main.centerView, Main.screen.mainContainer]}>
                <StatusBar hidden />
                <Image source={Images.logo} style={styles.logo}></Image>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <View style={[Main.centerView]}>
                        <Input
                            autoCapitalize='none'
                            keyboardType='email-address'
                            containerStyle={[styles.inputContainer]}
                            inputStyle={[styles.inputStyle]}
                            placeholder='Email'
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.emailErr}
                            onChangeText={text => {
                                this.setState({ email: text });
                                this.validationHandler()
                            }}
                            value={this.state.email}
                        />
                        <Input
                            autoCapitalize='none'
                            secureTextEntry
                            containerStyle={[styles.inputContainer]}
                            inputStyle={[styles.inputStyle]}
                            placeholder='Password'
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.passwordErr}
                            onChangeText={text => {
                                this.setState({ password: text })
                                this.validationHandler()
                                // this.checkPassword(text)
                            }}
                            value={this.state.password}
                        />
                        <Button
                            title="LOGIN"
                            // disabled={!this.state.isValid}
                            buttonStyle={[Main.button.highLightButton]}
                            containerStyle={{ width: WP(70), marginBottom: HP(2) }}
                            titleStyle={{ fontFamily: 'roboto-medium' }}
                            loading={this.state.isLoading}
                            onPress={() => {
                                this.onSignin()
                            }}
                        />
                          {/* <Button
                            title="LOGIN WITH FACEBOOK"
                            buttonStyle={[Main.button.highLightButton]}
                            containerStyle={{ width: WP(70), marginBottom: HP(2) }}
                            titleStyle={{ fontFamily: 'roboto-medium' }}
                            // loading={this.state.isLoading}
                            onPress={() => {
                                this.loginFB()
                            }}
                        />

                        <Button
                            title="LOGIN WITH GOOGLE"
                            buttonStyle={[Main.button.highLightButton]}
                            containerStyle={{ width: WP(70), marginBottom: HP(2) }}
                            titleStyle={{ fontFamily: 'roboto-medium' }}
                            // loading={this.state.isLoading}
                            onPress={() => {
                                this.loginGoogle()
                            }}
                        /> */}
                       
                    </View>
                    <SocialIcon
                        title='Sign In With Facebook'
                        button
                        type='facebook'
                        onPress={() => {
                            this.loginFB()
                        }}
                    />

                    <SocialIcon
                        title='Sign In With Google'
                        button
                        type='google'
                        onPress={() => {
                            this.loginGoogle()
                        }}
                    />
                </KeyboardAvoidingView>
                <TouchableOpacity
                    onPress={() => {
                        this.onSignup()
                    }}
                >
                    <Text style={{ fontFamily: 'roboto-medium' }}>New User?
                        <Text style={{ color: 'blue' }}> Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.userDataReducer.loading,
        data: state.userDataReducer.data,
        error: state.userDataReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SigninScreen);
