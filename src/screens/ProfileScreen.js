import React, { Component } from 'react';
import {View, Image, Text, KeyboardAvoidingView, Keyboard, Modal, Alert, Linking, AsyncStorage, Switch} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

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
    Button as Btn, Picker
} from "native-base";
import { Feather, Octicons } from '@expo/vector-icons';
import { Button, Input } from 'react-native-elements';
import AnimatedLoader from 'react-native-animated-loader';
import NavigationService from '../services/navigation';
import { Images, ApplicationStyles as Main } from '../theme';
import styles from './Styles/ProfileScreen';
import styles2 from './Styles/SettingsScreen';
import RNRestart from "react-native-restart";

import { Colors } from '../theme';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';



// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
    en: { 
        'Welcome to': 'Welcome to', 
        'Pending RTI Requests': 'Pending RTI Requests',
        'Accepted RTI Requests': 'Accepted RTI Requests',
        'Completed RTI Requests': 'Completed RTI Requests',
        'Rejected RTI Requests': 'Rejected RTI Requests',
        'Pending Requests': 'Pending Requests',
        'Accepted Requests': 'Accepted Requests',
        'Completed Requests': 'Completed Requests',
        'Rejected Requests': 'Rejected Requests',
        'Accepted': 'Accepted', 
        'Asking Time': 'Asking Time', 
        'Payment Doc Accepted': 'Payment Doc Accepted', 
        'Accepted Partial': 'Accepted Partial', 
        'Pending': 'Pending', 
        'Accepted Partial with Payment': 'Accepted Partial with Payment', 
        'Accepted with Payment': 'Accepted with Payment', 
        'Completed': 'Completed', 
        'Rejected': 'Rejected', 
        'Payment Doc Rejected': 'Payment Doc Rejected', 
        'Home': 'Home', 
        'New RTI Request': 'New RTI Request', 
        'Knowledge Base': 'Knowledge Base', 
        'Type Here': 'Type Here', 
        'Contact Us': 'Contact Us', 
        'Settings': 'Settings', 
        'Logout': 'Logout', 
        'Search RTI Requests': 'Search RTI Requests', 
        'Search by Title': 'Search by Title', 
        'Search by RTI ID': 'Search by RTI ID', 
        'Profile': 'Profile', 
        'Personal Information': 'Personal Information', 
        'Language': 'Language', 
        'Support': 'Support', 
        'Ask a Question': 'Ask a Question', 
        'Guide': 'Guide', 
        'Dos and Donts': "Dos and Don'ts", 
        'Privacy Policy': 'Privacy Policy', 
        'profile': 'Profile', 
        'welcome': 'Welcome',
        'COMPLETED': 'COMPLETED',
        'ACCEPTED': 'ACCEPTED',
        'PENDING': 'PENDING',
        'REJECTED': 'REJECTED',
        'Organization': 'Organization',
        'Organization2': 'Organization',
        'RTI Information': 'RTI Information',
        'Are you requesting this information as an Individual or representing an Organization': 'Are you requesting this information as an Individual or representing an Organization',
        'Individual': 'Individual',
        'Are you a Srilankan Citizen': 'Are you a Srilankan Citizen',
        'At least 75% of share holders of our company are Srilankan Citizens': 'At least 75% of share holders of our company are Srilankan Citizens',
        'Gender': 'Gender',
        'Female': 'Female',
        'Male': 'Male',
        'I want to receive SMS notifications': 'I want to receive SMS notifications',
        'Yes': 'Yes',
        'No': 'No'

    },
    si: { 
        'Welcome to': 'සාදරයෙන් පිළිගනිමු', 
        'Pending RTI Requests': 'අපේක්ෂිත RTI ඉල්ලීම්', 
        'Accepted RTI Requests': 'පිළිගත් RTI ඉල්ලීම්', 
        'Completed RTI Requests': 'සම්පූර්ණ RTI ඉල්ලීම්', 
        'Rejected RTI Requests': 'ප්‍රතික්ෂේපිත RTI ඉල්ලීම්', 
        'Pending Requests': 'අපේක්ෂිත ඉල්ලීම්',
        'Accepted Requests': 'පිළිගත් ඉල්ලීම්',
        'Completed Requests': 'සම්පූර්ණ ඉල්ලීම්',
        'Rejected Requests': 'ප්‍රතික්ෂේපිත ඉල්ලීම්',
        'Accepted': 'පිළිගත්', 
        'Asking Time': 'කාලය අවැසි', 
        'Payment Doc Accepted': 'ගෙවීම් පිළිගත්', 
        'Accepted Partial': 'අර්ධව පිළිගත්', 
        'Pending': 'අපේක්ෂිත', 
        'Accepted Partial with Payment': 'ගෙවීම් සමග අර්ධව පිළිගත්', 
        'Accepted with Payment': 'ගෙවීම් සමග පිළිගත්', 
        'Completed': 'සම්පූර්ණ', 
        'Rejected': 'ප්‍රතික්ෂේපිත', 
        'Payment Doc Rejected': 'ගෙවීම් ලේඛන ප්‍රතික්ෂේපිත', 
        'Quick Access': 'ඉක්මන් ප්‍රවේශය', 
        'Home': 'මුල් පිටුව', 
        'New RTI Request': 'නව RTI ඉල්ලීම්', 
        'Knowledge Base': 'දැනුම', 
        'Type Here': 'මෙහි පුරවන්න', 
        'Contact Us': 'සම්බන්ධවන්න', 
        'Settings': 'සැකසුම්', 
        'Logout': 'ඉවත්වන්න', 
        'Search RTI Requests': 'RTI ඉල්ලීම් සොයන්න', 
        'Search by Title': 'මාතෘකාව අනුව', 
        'Search by RTI ID': 'RTI ID අනුව', 
        'Profile': 'ගිණුම', 
        'Personal Information': 'පුද්ගලික තොරතුරු', 
        'Language': 'භාෂාව', 
        'Support': 'සහාය', 
        'Ask a Question': 'ප්‍රශ්නයක් අහන්න', 
        'Guide': 'මගපෙන්වීම', 
        'Dos and Donts': "කළ යුතු හා නොකළ යුතු දේ", 
        'Privacy Policy': 'රහස්‍යතා ප්‍රතිපත්තිය', 
        'profile': 'පැතිකඩ' ,
        'welcome': 'සාදරයෙන් පිළිගනිමු',
        'COMPLETED': 'සම්පූර්ණ',
        'ACCEPTED': 'පිළිගත්',
        'PENDING': 'අපේක්ෂිත',
        'REJECTED': 'ප්‍රතික්ෂේපිත',
        'Organization': 'සංවිධානය',
        'Organization2': 'සංවිධානයක් ලෙස',
        'RTI Information': 'RTI තොරතුරු',
        'Are you requesting this information as an Individual or representing an Organization': 'ඔබ මෙම තොරතුරු ඉල්ලා සිටින්නේ පුද්ගලයෙක් එසේ නොමැති නම් ආයතනයක් ලෙසද',
        'Individual': 'තනි පුද්ගලයෙක් ලෙස',
        'Are you a Srilankan Citizen': 'ඔබ ශ්‍රීලංකා පුරවැසියෙක්ද',
        'At least 75% of share holders of our company are Srilankan Citizens': 'අපගේ සමාගමේ කොටස් හිමියන්ගෙන් අවම වශයෙන් 75% ක් ශ්‍රි ලාංකික පුරවැසියන් ය',
        'Gender': 'ස්ත්‍රී/පුරුශ භාවය',
        'Female': 'ස්ත්‍රී',
        'Male': 'පුරුෂ',
        'I want to receive SMS notifications': 'මට SMS දැනුම්දීම් ලැබීමට අවශ්‍යයි',
        'Yes': 'ඔව්',
        'No': 'නැහැ'
     },
    ti: { 
        'Welcome to': 'வரவேற்கிறோம்', 
        'Pending RTI Requests': 'நிலுவையிலுள்ள RTI கோரிக்கைகள்', 
        'Accepted RTI Requests': 'ஏற்றுக்கொண்ட RTI கோரிக்கைகள்', 
        'Completed RTI Requests': 'பூர்த்திசெய்த RTI கோரிக்கைகள்', 
        'Rejected RTI Requests': 'நிராகரித்த RTI கோரிக்கைகள்', 
        'Pending Requests': 'நிலுவையிலுள்ள கோரிக்கைகள்',
        'Accepted Requests': 'ஏற்றுக்கொண்ட கோரிக்கைகள்',
        'Completed Requests': 'பூர்த்திசெய்த கோரிக்கைகள்',
        'Rejected Requests': 'நிராகரித்த கோரிக்கைகள்',
        'Accepted': 'ஏற்றுக்கொள்ளப்பட்டது', 
        'Asking Time': 'கேட்கும் நேரம்', 
        'Payment Doc Accepted': 'கட்டணம் ஏற்றுக்கொள்ளப்பட்டது', 
        'Accepted Partial': 'பகுதியாக ஏற்றுக்கொள்ளப்பட்டது', 
        'Pending': 'நிலுவையில் உள்ளது', 
        'Accepted Partial with Payment': 'கட்டணத்துடன் பகுதியாக ஏற்றுக்கொள்ளப்பட்டது', 
        'Accepted with Payment': 'கட்டணத்துடன் ஏற்றுக்கொள்ளப்பட்டது', 
        'Completed': 'நிறைவுசெய்யப்பட்டது', 
        'Rejected': 'நிராகரிக்கப்பட்டது', 
        'Payment Doc Rejected': 'கட்டணம் நிராகரிக்கப்பட்டது', 
        'Quick Access': 'துரித அணுகல்', 
        'Home': 'முகப்பு', 
        'New RTI Request': 'புதிய RTI கோரிக்கை', 
        'Knowledge Base': 'அறிவுத் தளம்', 
        'Type Here': 'உள்ளீடு செய்க', 
        'Contact Us': 'தொடர்பு கொள்க', 
        'Settings': 'அமைப்புகள்', 
        'Logout': 'வெளியேறுக', 
        'Search RTI Requests': 'RTI கோரிக்கைகளை தேடுக', 
        'Search by Title': 'தலைப்பு மூலம் தேடுக', 
        'Search by RTI ID': 'RTI ID மூலம் தேடுக', 
        'Profile': 'சுயவிவரம்', 
        'Personal Information': 'தனிப்பட்ட தகவல்', 
        'Language': 'மொழி', 
        'Support': 'ஆதரவு', 
        'Ask a Question': 'கேள்வி கேளுங்கள்', 
        'Guide': 'வழிகாட்டி', 
        'Dos and Donts': "செய்ய வேண்டியவை மற்றும் கூடாதவை", 
        'Privacy Policy': 'தனியுரிமைக் கொள்கை', 
        'profile': 'சுயவிவரம்' ,
        'welcome': 'வரவேற்பு',
        'COMPLETED': 'நிறைவுசெய்யப்பட்டது',
        'ACCEPTED': 'ஏற்றுக்கொள்ளப்பட்டது',
        'PENDING': 'நிலுவையில் உள்ளது',
        'REJECTED': 'நிராகரிக்கப்பட்டது',
        'Organization': 'அமைப்பு',
        'Organization2': 'நிறுவனம்',
        'RTI Information': 'RTI தகவல்',
        'Are you requesting this information as an Individual or representing an Organization': 'நீங்கள் இத் தகவல்களை கோருவது தனிப்பட்ட முறையிலா அல்லது நிறுவனத்தின் சார்பாகவா',
        'Individual': 'தனிப்பட்ட',
        'Are you a Srilankan Citizen': 'நீங்கள் இலங்கை பிரஜையா',
        'At least 75% of share holders of our company are Srilankan Citizens': 'உங்கள் நிறுவனத்தில் குறைந்தது 75% பங்குதாரர்கள் இலங்கை பிரஜைகளா',
        'Gender': 'பாலினம்',
        'Female': 'பெண்',
        'Male': 'ஆண்',
        'I want to receive SMS notifications': 'எனக்கு SMS ஊடாக தகவல் பெற்றுக்கொள்ள வேண்டும்',
        'Yes': 'ஆம்',
        'No': 'இல்லை' 
    },
  };
  // Set the locale once at the beginning of your app.
//   i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;
i18n.detectBrowserLanguage = false


let userUpdateData = {}
let x = 0;

class ProfileScreen extends Component {
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
            loadingData: false,
            stateOfLocale: ''
        }

        // i18n.locale = this.state.lang;

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

    // onLogout = () => {
    //     AsyncStorage.clear();
    //     NavigationService.navigate('SigninScreen')
    // }

    onProfileLoadHandler() {
        const { data, loading } = this.props;
        this.props.userDetails(res => {
            if (res) {
                setTimeout(() => {
                    this.setState({
                        loadingData: false
                    })
                    console.log(this.props.data);
                    this.setState({
                        name: this.props.data.user.name,
                        email: this.props.data.user.email,
                        lastName: this.props.data.user.last_name,
                        firstName: this.props.data.user.first_name,
                        address: this.props.data.user.user_address1,
                    })
                }, 2000);
            }
        })
    }


    async setLocale(key) {
        console.log(key);
        if(key == 'key0'){
            this.setState({stateOfLocale: 'en'})
            // await AsyncStorage.setItem('USER_LANGUAGE_PICKED', 'en');
        }else if(key == 'key1'){
            this.setState({stateOfLocale: 'si'})
            // await AsyncStorage.setItem('USER_LANGUAGE_PICKED', 'si');
        }else if(key == 'key2'){
            // await AsyncStorage.setItem('USER_LANGUAGE_PICKED', 'ti');
            this.setState({stateOfLocale: 'ti'})
        }

        // const languageCode = await AsyncStorage.getItem('USER_LANGUAGE_PICKED');

        console.log(this.state.stateOfLocale)
        // console.log(languageCode)

        //    this.setState({
        //     stateOfLocale: 'si'
        // })
        // stateOfLocale = 'si'
        // this.setState({stateOfLocale: 'si'});
        i18n.locale = this.state.stateOfLocale;
        // i18n.locale = languageCode;
        

        // while(x > 2){
        //     this.setLocale(key);
        //     x = x + 1;
        //     console.log(x)
        // }

        
        //  RNRestart.Restart();


    }


    // async onLanguageChange(language){
    //     console.log(language)
    //     // console.log(AsyncStorage.getItem('lang'))
    //     // i18n.locale = language;
    //     // this.setState({
    //     //     lang: language
    //     // })
    //     AsyncStorage.setItem(APP_LANGUAGE, language);
    //     i18n.locale = 'si'
    //     RNRestart.Restart();

    // }

    onEdit() {
        this.setState({
            isEdit: true
        })
        console.log('edit profile')
    }

    onSave() {
        this.setState({
            isEdit: false
        })
        console.log('save profile')
        Keyboard.dismiss();
        userUpdateData.name = this.state.name;
        userUpdateData.email = this.state.email;
        userUpdateData.first_name = this.state.firstName;
        userUpdateData.last_name = this.state.lastName;
        userUpdateData.user_address1 = this.state.address;

        this.props.userUpdate(userUpdateData, (res) => {
          // console.log(this.props);
            if (res) {
                this.onProfileLoadHandler();
            } else {
                Alert.alert('Not Updated!');
            }
        })

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
            <Container style={{ backgroundColor: Colors.offwhite }}>
                <Header style={[{ backgroundColor: Colors.blue, borderBottomWidth: 0 },]} noShadow>
                    <Left>
                        <Btn transparent icon
                            onPress={() => {
                                goBack()
                            }}
                        >
                            <Feather name="x" size={RF(3)} color='#FFFFFF' />
                        </Btn>
                    </Left>

                    <Right>
                        <Btn transparent icon
                            onPress={() => {
                                { this.state.isEdit ? this.onSave() : this.onEdit() }
                            }}
                        >
                            {this.state.isEdit ? <Feather name="save" size={RF(2.5)} color='#FFFFFF' /> : <Feather name="edit" size={RF(2.5)} color='#FFFFFF' />}
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
                <View style={[Main.screen.screenTitleSection]}>
                    <Text style={[Main.screen.screenTitle]}>{i18n.t('Profile')} </Text>
                </View>
                <View style={[styles.profileImageSection]}>
                    <Image source={Images.user} style={[styles.profileImageView]} />
                    <Text style={[styles.profileTitle]}>{this.state.name}</Text>
                </View>
                <ScrollView>
                    <KeyboardAvoidingView behavior='position' enabled>
                        <View style={[Main.card.cardOuter, styles.fromTop]}>
                            <View style={[Main.card.cardStyle, Main.shadow, Main.centerView]}>
                                <Text style={[styles2.formTitle2]}>{i18n.t('Personal Information')} </Text>
                                <Input
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    disabled={!this.state.isEdit}
                                    containerStyle={[styles.inputContainer]}
                                    inputStyle={[styles.inputStyle]}
                                    placeholder='Email'
                                    errorStyle={{ color: 'red' }}
                                    value={this.state.email}
                                    errorMessage={this.state.emailErr}
                                    onChangeText={(text) => {
                                        if (this.emailValidation(text)) {
                                            this.setState({
                                                email: text,
                                                isEmail: true
                                            })
                                        } else {
                                            this.setState({
                                                email: text,
                                                isEmail: false
                                            })
                                        }
                                    }}
                                />
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    disabled={!this.state.isEdit}
                                    containerStyle={[styles.inputContainer]}
                                    inputStyle={[styles.inputStyle]}
                                    placeholder='User Name'
                                    errorStyle={{ color: 'red' }}
                                    value={this.state.name}
                                    // errorMessage={this.state.emailErr}
                                    onChangeText={(text) => {
                                        this.setState({
                                            name: text
                                        })
                                    }}
                                />
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    disabled={!this.state.isEdit}
                                    containerStyle={[styles.inputContainer]}
                                    inputStyle={[styles.inputStyle]}
                                    placeholder='First Name'
                                    errorStyle={{ color: 'red' }}
                                    value={this.state.firstName}
                                    // errorMessage={this.state.emailErr}
                                    onChangeText={(text) => {
                                        this.setState({
                                            firstName: text
                                        })
                                    }}
                                />
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    disabled={!this.state.isEdit}
                                    containerStyle={[styles.inputContainer]}
                                    inputStyle={[styles.inputStyle]}
                                    placeholder='Last Name'
                                    errorStyle={{ color: 'red' }}
                                    value={this.state.lastName}
                                    // errorMessage={this.state.emailErr}
                                    onChangeText={(text) => {
                                        this.setState({
                                            lastName: text
                                        })
                                    }}
                                />
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    disabled={!this.state.isEdit}
                                    containerStyle={[styles.inputContainer]}
                                    inputStyle={[styles.inputStyle]}
                                    placeholder='Address'
                                    errorStyle={{ color: 'red' }}
                                    value={this.state.address}
                                    // errorMessage={this.state.emailErr}
                                    onChangeText={(text) => {
                                        this.setState({
                                            address: text
                                        })
                                    }}
                                />
                            </View>
                        </View>
                        <View style={[Main.card.cardOuter]}>
                            <View style={[Main.card.cardStyle, Main.shadow]}>
                                <View style={[styles2.formSection]}>
                                    <Text style={[styles2.formTitle2]}>{i18n.t('Settings')}</Text>
                                    {/* <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                        <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                            <Text style={[styles2.switchTitle]}>SMS notifications</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Switch
                                                trackColor={{ true: Colors.blue, false: Colors.transash }}
                                                thumbColor={Colors.offblue}
                                                value={this.state.isSmsNotification}
                                                onChange={(value) => {
                                                    this.onSmsNotofocation(value.nativeEvent.value)
                                                }}
                                            />
                                        </View>
                                    </View> */}
{/* 
                                    <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                        <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                            <Text style={[styles2.switchTitle]}>App notifications</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Switch
                                                trackColor={{ true: Colors.blue, false: Colors.transash }}
                                                thumbColor={Colors.offblue}
                                                value={this.state.isAppNotification}
                                                onChange={(value) => {
                                                    this.onAppNotofocation(value.nativeEvent.value)
                                                }}
                                            />
                                        </View>
                                    </View> */}

                                    {/* <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                        <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                            <Text style={[styles2.switchTitle]}>Password Change</Text>
                                        </View>
                                        <View style={{ flex: 1 }} />
                                    </View> */}

                                    <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                        <View style={[{ justifyContent: 'center', flex: 3 }]}>
                                            <Text style={[styles2.switchTitle]}>{i18n.t('Language')}  </Text>
                                        </View>
                                        <View style={[{ flex: 2, alignItems: 'flex-end' }]}>
                                            <Picker
                                                selectedValue={this.state.language}
                                                iosIcon={<Feather name="chevron-down" color={Colors.blue} />}
                                                mode='dropdown'
                                                textStyle={{color: Colors.blue}}
                                                style={[{width: WP(25)}]}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    // this.setLocale(itemValue),
                                                    this.setState({ stateOfLocale: itemValue })
                                                    i18n.locale = this.state.stateOfLocale
                                                }
                                                }>
                                                <Picker.Item label="Select Language" value="non" />
                                                <Picker.Item label="English" value="en" />
                                                <Picker.Item label="සිංහල" value="si" />
                                                <Picker.Item label="தமிழ்" value="ti" />
                                            </Picker>

                                            {/* <Button
                                    // disabled={this.state.isValidPaymentWithPartialAccepted}
                                    title="Sinhala"
                                    // buttonStyle={[Main.button.highLightButton]}
                                    containerStyle={{width: WP(50), marginVertical: HP(2)}}
                                    titleStyle={{fontFamily: 'roboto-medium'}}
                                    onPress={() => this.setLocale()}
                                /> */}

                                        </View>
                                    </View>
                                </View>

                                <View style={[styles2.barBorder]}></View>

                                <View style={[styles2.formSection]}>
                                    <Text style={[styles2.formTitle]}>{i18n.t('Support')}</Text>

                                    <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                        <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                            <Text style={[styles2.switchTitle]}
                                            onPress={() => Linking.openURL('https://www.rti.gov.lk/contact-us')}
                                            >{i18n.t('Ask a Question')}</Text>
                                        </View>
                                        <View style={{ flex: 1 }} />
                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                        <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                            <Text style={[styles2.switchTitle]}
                                            onPress={() => Linking.openURL('https://rtionline.gov.lk/guide/en')}
                                            >{i18n.t('Guide')}</Text>
                                        </View>
                                        <View style={{ flex: 1 }} />
                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                        <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                            <Text style={[styles2.switchTitle]}
                                            onPress={() => Linking.openURL('https://rtionline.gov.lk/dos_donts/en')}
                                            >{i18n.t('Dos and Donts')}</Text>
                                        </View>
                                        <View style={{ flex: 1 }} />
                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                        <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                            <Text style={[styles2.switchTitle]}
                                            onPress={() => Linking.openURL('https://rtionline.gov.lk/privacy_policy')}
                                            >{i18n.t('Privacy Policy')}</Text>
                                        </View>
                                        <View style={{ flex: 1 }} />
                                    </View>

                                    {/* <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                        <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                            <Text style={[styles2.switchTitle]}
                                            onPress={() => Linking.openURL('https://rtionline.gov.lk')}
                                            >FAQ</Text>
                                        </View>
                                        <View style={{ flex: 1 }} />
                                    </View> */}
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
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
)(ProfileScreen);
