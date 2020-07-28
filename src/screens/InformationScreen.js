
import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Switch } from "react-native";
import {
    Container,
    Header,
    Left,
    Right,
    Button as Btn,
} from "native-base";
import { Feather, Octicons } from '@expo/vector-icons';
import RadioButton from 'react-native-radio-button';
import { Images, ApplicationStyles as Main, Colors } from '../theme';
import { Input, Button } from 'react-native-elements';
import AnimatedLoader from 'react-native-animated-loader';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import styles from './Styles/InformationScreen';
import NavigationService from '../services/navigation';
import { ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions
import i18n from 'i18n-js';


class InformationScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address1: '',
            address2: '',
            city: '',
            district: '',
            mobile: '',
            gender: 1,
            type: 1,
            citizen: null,
            share_holders_citizen: null,
            isSms: true,
            errName: '',
            isValid: false,
            isLoading: true,
        };
    }

    componentDidMount() {
        this.onGetProfileDetails();
    }

    onGetProfileDetails = () => {
        this.props.userDetails(res => {
            if (res) {
                this.setState({
                    isLoading: false,
                    name: this.props.data.user.name,
                    address1: this.props.data.user.user_address1,
                    address2: this.props.data.user.user_address2,
                    city: this.props.data.user.user_city,
                    district: this.props.data.user.user_district,
                    gender: this.props.data.user.user_gendor,
                    mobile: this.props.data.user.mobile
                })
                global.RTIRequest.rti_mobile = this.props.data.user.mobile;
                global.RTIRequest.rti_email = this.props.data.user.email;

                this.isValidated();
            }
        })
    }

    onContinue() {

        global.RTIRequest.rti_first_name = this.state.name;
        global.RTIRequest.rti_address1 = this.state.address1;
        global.RTIRequest.rti_address2 = this.state.address2;
        global.RTIRequest.rti_city = this.state.city;
        global.RTIRequest.rti_district = this.state.district;
        global.RTIRequest.rti_mobile = this.state.mobile;

        console.log(global.RTIRequest)

        NavigationService.navigate('RTISubmitScreen');
    }

    onGenderItem = (value) => {
        global.RTIRequest.rti_gender = value;
        this.setState({ gender: value });
    }

    onTypeItem = (value) => {
        global.RTIRequest.rti_user_type = value;
        if (value == 2) {
          this.onCitizenItem(value);
            global.RTIRequest.rti_share_holder_citizen = 'YES'
            delete global.RTIRequest.rti_is_srilankan
        }
        if (value == 1) {
          this.onCitizenItem(value);
            global.RTIRequest.rti_is_srilankan = 'YES'
            delete global.RTIRequest.rti_share_holder_citizen
        }
        this.setState({ type: value });
        setTimeout(() => {
            this.isValidated();
        }, 1);
    }

    onCitizenItem = (value) => {
        global.RTIRequest.rti_is_srilankan = value;
        this.setState({
            citizen: value,
            share_holders_citizen: !value
        });
        setTimeout(() => {
            this.isValidated();
        }, 1);
    }

    onShareHoldersCitizenItem = (value) => {
        global.RTIRequest.rti_share_holder_citizen = value;
        this.setState({
            share_holders_citizen: value,
            citizen: !value
        });
        setTimeout(() => {
            this.isValidated();
        }, 1);
    }

    isSmsActive = (value) => {
        console.log(value.nativeEvent.value)
        this.setState({ isSms: value.nativeEvent.value });
        if (value) {
            global.RTIRequest.rti_sms_enable = 1;
        } else {
            global.RTIRequest.rti_sms_enable = 0;
        }
    }

    isValidated = () => {
        if ((this.state.name != '') && (this.state.address1 != '') && (this.state.city != '') && (this.state.district != '') && (this.state.type != null) && (this.state.citizen == 'YES' || this.state.share_holders_citizen == 'YES') && (this.state.mobile != null)) {
            this.setState({
                isValid: true
            })
        } else {
            this.setState({
                isValid: false
            })
        }
    }


    render() {
        const { goBack } = this.props.navigation;
        return (
            <Container style={{ backgroundColor: Colors.offwhite }}>
                <Header style={[{ backgroundColor: Colors.blue, borderBottomWidth: 0 },]} noShadow>
                    <Left>
                        <Btn transparent icon
                            onPress={() => goBack()}
                        >
                            <Feather name="arrow-left" size={RF(3)} color='#FFFFFF' />
                        </Btn>
                    </Left>
                    <Right />
                </Header>
                <View style={[Main.screen.screenTitleSection]}>
                    <Text style={[Main.screen.screenTitle]}>{i18n.t('New RTI Request')}</Text>
                </View>

                <AnimatedLoader
                    visible={this.state.isLoading}
                    overlayColor="rgba(0,0,0,0.35)"
                    source={Images.animatedLoader}
                    animationStyle={Main.lottie}
                    speed={1}
                />

                <View style={[styles.cardOuter]}>
                    <View style={[Main.shadow, styles.cardStyle]}>
                        <Text style={[styles.title]}>{i18n.t('Personal Information')} </Text>
                        <KeyboardAvoidingView behavior="padding" enabled>
                            <View style={[Main.centerView]}>
                                <ScrollView style={[styles.scrollContainer]}>
                                    <Input
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        containerStyle={[styles.inputContainer]}
                                        inputStyle={[styles.inputStyle]}
                                        placeholder='Your Name *'
                                        errorStyle={{ color: 'red' }}
                                        errorMessage={this.state.errName}
                                        onChangeText={text => {
                                            this.setState({ name: text });
                                            this.isValidated()
                                        }}
                                        value={this.state.name}
                                    />
                                    <Input
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        containerStyle={[styles.inputContainer]}
                                        inputStyle={[styles.inputStyle]}
                                        placeholder='Address Line 01 *'
                                        errorStyle={{ color: 'red' }}
                                        errorMessage={this.state.errName}
                                        onChangeText={text => {
                                            this.setState({ address1: text });
                                            this.isValidated()
                                        }}
                                        value={this.state.address1}
                                    />
                                    <Input
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        containerStyle={[styles.inputContainer]}
                                        inputStyle={[styles.inputStyle]}
                                        placeholder='Address Line 02'
                                        errorStyle={{ color: 'red' }}
                                        errorMessage={this.state.errName}
                                        onChangeText={text => {
                                            this.setState({ address2: text });
                                            this.isValidated()
                                        }}
                                        value={this.state.address2}
                                    />
                                    <Input
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        containerStyle={[styles.inputContainer]}
                                        inputStyle={[styles.inputStyle]}
                                        placeholder='City *'
                                        errorStyle={{ color: 'red' }}
                                        errorMessage={this.state.errName}
                                        onChangeText={text => {
                                            this.setState({ city: text });
                                            this.isValidated()
                                        }}
                                        value={this.state.city}
                                    />
                                    <Input
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        containerStyle={[styles.inputContainer]}
                                        inputStyle={[styles.inputStyle]}
                                        placeholder='District *'
                                        errorStyle={{ color: 'red' }}
                                        errorMessage={this.state.errName}
                                        onChangeText={text => {
                                            this.setState({ district: text });
                                            this.isValidated()
                                        }}
                                        value={this.state.district}
                                    />
                                    <Input
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        containerStyle={[styles.inputContainer]}
                                        inputStyle={[styles.inputStyle]}
                                        placeholder='94123456789'
                                        errorStyle={{ color: 'red' }}
                                        errorMessage={this.state.errName}
                                        onChangeText={text => {
                                            this.setState({ mobile: text });
                                            this.isValidated()
                                        }}
                                        value={this.state.mobile}
                                    />
                                    <View style={[styles.formSection]}>
                                        <Text style={[styles.formTitle]}>{i18n.t('Gender')} *</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableWithoutFeedback
                                                onPress={() => { this.onGenderItem(1) }}
                                            >
                                                <View style={{ flexDirection: 'row', marginHorizontal: WP(2) }}>
                                                    <View style={{ marginRight: WP(1) }}>
                                                        <RadioButton
                                                            innerColor={this.state.gender == 1 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.gender == 1 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.gender === 1}
                                                            onPress={() => { this.onGenderItem(1) }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView]}>
                                                        <Text>{i18n.t('Male')}</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback
                                                onPress={() => { this.onGenderItem(0) }}
                                            >
                                                <View style={{ flexDirection: 'row', marginHorizontal: WP(2) }}>
                                                    <View style={{ marginRight: WP(1) }}>
                                                        <RadioButton
                                                            innerColor={this.state.gender == 0 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.gender == 0 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.gender === 0}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView]}>
                                                        <Text>{i18n.t('Female')}</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>

                                    <View style={[styles.formSection]}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                                <Text style={[styles.switchTitile, { fontWeight: 'bold' }]}>{i18n.t('I want to receive SMS notifications')}</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Switch
                                                    trackColor={{ true: Colors.blue, false: Colors.transash }}
                                                    thumbColor={Colors.offblue}
                                                    value={this.state.isSms}
                                                    onChange={(value) => {
                                                        this.isSmsActive(value)
                                                    }}
                                                />
                                            </View>
                                        </View>

                                    </View>

                                    <View style={[styles.formSection]}>
                                        <Text style={[styles.formSubTitle]}>{i18n.t('Are you requesting this information as an Individual or representing an Organization')} ?</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableWithoutFeedback
                                                onPress={() => { this.onTypeItem(1) }}
                                            >
                                                <View style={{ flexDirection: 'row', marginHorizontal: WP(2) }}>
                                                    <View style={{ marginRight: WP(1) }}>
                                                        <RadioButton
                                                            innerColor={this.state.type == 1 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.type == 1 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.type === 1}
                                                            onPress={() => { this.onTypeItem(1) }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView]}>
                                                        <Text>{i18n.t('Individual')}</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback
                                                onPress={() => { this.onTypeItem(2) }}
                                            >
                                                <View style={{ flexDirection: 'row', marginHorizontal: WP(2) }}>
                                                    <View style={{ marginRight: WP(1) }}>
                                                        <RadioButton
                                                            innerColor={this.state.type == 2 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.type == 2 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.type === 2}
                                                            onPress={() => { this.onTypeItem(2) }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView]}>
                                                        <Text>{i18n.t('Organization2')}</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>

                                    {this.state.type == 1 ?

                                        <View style={[styles.formSection]}>
                                            <Text style={[styles.formTitle]}>{i18n.t('Are you a Srilankan Citizen')} ?</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableWithoutFeedback
                                                    onPress={() => { this.onCitizenItem('YES') }}
                                                >
                                                    <View style={{ flexDirection: 'row', marginHorizontal: WP(2) }}>
                                                        <View style={{ marginRight: WP(1) }}>
                                                            <RadioButton
                                                                innerColor={this.state.citizen == 'YES' ? Colors.blue : Colors.transash}
                                                                outerColor={this.state.citizen == 'YES' ? Colors.offblue : Colors.transash}
                                                                animation={'bounceIn'}
                                                                isSelected={this.state.citizen === 'YES'}
                                                                onPress={() => { this.onCitizenItem('YES') }}
                                                            />
                                                        </View>
                                                        <View style={[Main.centerView]}>
                                                            <Text>{i18n.t('Yes')}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <TouchableWithoutFeedback
                                                    onPress={() => { this.onCitizenItem('NO') }}
                                                >
                                                    <View style={{ flexDirection: 'row', marginHorizontal: WP(2) }}>
                                                        <View style={{ marginRight: WP(1) }}>
                                                            <RadioButton
                                                                innerColor={this.state.citizen == 'NO' ? Colors.blue : Colors.transash}
                                                                outerColor={this.state.citizen == 'NO' ? Colors.offblue : Colors.transash}
                                                                animation={'bounceIn'}
                                                                isSelected={this.state.citizen === 'NO'}
                                                                onPress={() => { this.onCitizenItem('NO') }}
                                                            />
                                                        </View>
                                                        <View style={[Main.centerView]}>
                                                            <Text>{i18n.t('No')}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                        :
                                        <View style={[styles.formSection]}>
                                            <Text style={[styles.formTitle]}>{i18n.t('At least 75% of share holders of our company are Srilankan Citizens')}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableWithoutFeedback
                                                    onPress={() => { this.onShareHoldersCitizenItem('YES') }}
                                                >
                                                    <View style={{ flexDirection: 'row', marginHorizontal: WP(2) }}>
                                                        <View style={{ marginRight: WP(1) }}>
                                                            <RadioButton
                                                                innerColor={this.state.share_holders_citizen == 'YES' ? Colors.blue : Colors.transash}
                                                                outerColor={this.state.share_holders_citizen == 'YES' ? Colors.offblue : Colors.transash}
                                                                animation={'bounceIn'}
                                                                isSelected={this.state.share_holders_citizen === 'YES'}
                                                                onPress={() => { this.onShareHoldersCitizenItem('YES') }}
                                                            />
                                                        </View>
                                                        <View style={[Main.centerView]}>
                                                            <Text>{i18n.t('Yes')}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <TouchableWithoutFeedback
                                                    onPress={() => { this.onShareHoldersCitizenItem('NO') }}
                                                >
                                                    <View style={{ flexDirection: 'row', marginHorizontal: WP(2) }}>
                                                        <View style={{ marginRight: WP(1) }}>
                                                            <RadioButton
                                                                innerColor={this.state.share_holders_citizen == 'NO' ? Colors.blue : Colors.transash}
                                                                outerColor={this.state.share_holders_citizen == 'NO' ? Colors.offblue : Colors.transash}
                                                                animation={'bounceIn'}
                                                                isSelected={this.state.share_holders_citizen === 'NO'}
                                                                onPress={() => { this.onShareHoldersCitizenItem('NO') }}
                                                            />
                                                        </View>
                                                        <View style={[Main.centerView]}>
                                                            <Text>{i18n.t('No')}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                    }

                                </ScrollView>
                                <Button
                                    title="CONTINUE"
                                    disabled={!this.state.isValid}
                                    buttonStyle={[Main.button.highLightButton]}
                                    containerStyle={{ width: WP(80), marginVertical: HP(2) }}
                                    titleStyle={{ fontFamily: 'roboto-medium' }}
                                    onPress={() => {
                                        this.onContinue()
                                    }}
                                />
                            </View>
                        </KeyboardAvoidingView>
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
)(InformationScreen);
