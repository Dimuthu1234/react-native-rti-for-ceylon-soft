import React, { Component } from 'react';
import { View, Image, Text, KeyboardAvoidingView, Keyboard, StatusBar } from 'react-native';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import { Button, Input } from 'react-native-elements';
import NavigationService from '../services/navigation';
import { Images, ApplicationStyles as Main } from '../theme';
import styles from './Styles/SignupScreen';
import { Colors } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions
import i18n from 'i18n-js';


class SignupScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            conPassword: '',
            name: '',
            passwordErr: '',
            passwordErr1: '',
            emailErr: '',
            nameErr: '',
            isEmailValid: false,
            isValid: false,
            isLoading: false
        }
    }

    componentDidMount() {
        console.log('SignupScreen');
    }

    /**
     * registerHandler - handle the registeration
     */
    registerHandler() {
        Keyboard.dismiss();

        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('confirm_password', this.state.conPassword);

        this.setState({
            isLoading: true
        })

        this.props.userRegister(formData, (res) => {
            if (!res) {
                this.setState({
                    emailErr: 'Already have an account!',
                    isLoading: false
                })
            } else {
                this.setState({
                    isLoading: false
                })
                NavigationService.navigate('SigninScreen')
            }
        })
    }

    /**
    * onSignin - navigate to sign in screen
    */
    onSignin() {
        NavigationService.navigate('SigninScreen')
    }


    /**
 * validating the variables
 */
    validationHandler() {
        if ((this.emailValidate(this.state.email)) && (this.state.email != '' && this.state.password != '' && this.state.conPassword != '' && this.state.name != '')) {
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

    checkPassword() {
        if (!(this.state.password.length >= 7)) {
            this.setState({
                passwordErr: 'Password must contain at least 8 characters!',
            })
        } else {
            this.setState({
                passwordErr: '',
            })
        }
    }

    /**
     * check confirm password
     */

    checkConPassword(text) {
        if (this.state.password !== text) {
            this.setState({
                passwordErr1: 'Password not matched!',
                isValid: false
            })
        } else {
            this.setState({
                passwordErr1: '',
                isValid: true
            })
        }
    }

    render() {
        return (
            <View style={[Main.centerView, Main.screen.mainContainer]}>
                <StatusBar hidden />
                <Image source={Images.logo} style={styles.logo}></Image>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <View style={[Main.centerView]}>
                        <Input
                            autoCapitalize='none'
                            containerStyle={[styles.inputContainer]}
                            inputStyle={[styles.inputStyle]}
                            placeholder='User Name'
                            errorMessage={this.state.nameErr}
                            onChangeText={text => {
                                this.setState({ name: text });
                            }}
                            value={this.state.name}
                        />
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
                                this.setState({ password: text });
                                this.validationHandler()
                                this.checkPassword()
                            }}
                            value={this.state.password}
                        />
                        <Input
                            autoCapitalize='none'
                            secureTextEntry
                            containerStyle={[styles.inputContainer]}
                            inputStyle={[styles.inputStyle]}
                            placeholder='Retype Password'
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.passwordErr1}
                            onChangeText={text => {
                                this.setState({ conPassword: text });
                                this.validationHandler()
                                this.checkConPassword(text)
                            }}
                            value={this.state.conPassword}
                        />
                        <Button
                            title="REGISTER"
                            disabled={!this.state.isValid}
                            buttonStyle={[Main.button.highLightButton]}
                            titleStyle={{ fontFamily: 'roboto-medium' }}
                            containerStyle={{ width: WP(70), marginBottom: HP(2) }}
                            loading={this.state.isLoading}
                            onPress={() => {
                                this.registerHandler()
                            }}
                        />
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    onPress={() => {
                        this.onSignin()
                    }}
                >
                    <Text style={{ fontFamily: 'roboto-medium' }}>Already have an Account?
                        <Text style={{ color: 'blue' }}> Sign In</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.userRegisterDataReducer.loading,
        data: state.userRegisterDataReducer.data,
        error: state.userRegisterDataReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignupScreen);