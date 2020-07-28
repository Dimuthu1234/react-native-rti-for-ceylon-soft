import React, { Component } from 'react';
import { View, Image, Text, KeyboardAvoidingView, Keyboard, Switch } from 'react-native';
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
    Button as Btn,
    Picker
} from "native-base";
import { Feather, Octicons } from '@expo/vector-icons';
import { Button, Input } from 'react-native-elements';
import NavigationService from '../services/navigation';
import { Images, ApplicationStyles as Main } from '../theme';
import styles from './Styles/SettingsScreen';
import { Colors } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from 'i18n-js';


export default class SettingsScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            language: 'key0',
            emailErr: '',
            isSmsNotification: true,
            isAppNotification: false,

        }
    }

    onSmsNotofocation = (value) => {
        this.setState({
            isSmsNotification: value
        })
    }
    onAppNotofocation = (value) => {
        this.setState({
            isAppNotification: value
        })
    }

    render() {
        const { goBack } = this.props.navigation;
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
                    <Right />
                </Header>
                <View style={[Main.screen.screenTitleSection]}>
                    <Text style={[Main.screen.screenTitle]}>Settings</Text>
                </View>
                <View style={[Main.card.cardOuter]}>
                    <View style={[Main.card.cardStyle, Main.shadow]}>
                        <View style={[styles.formSection]}>
                            <Text style={[styles.formTitle]}>Settings</Text>
                            <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                    <Text style={[styles.switchTitle]}>SMS notifications</Text>
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
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                    <Text style={[styles.switchTitle]}>App notifications</Text>
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
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                    <Text style={[styles.switchTitle]}>Password Change</Text>
                                </View>
                                <View style={{ flex: 1 }} />
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                <View style={[{ justifyContent: 'center', flex: 3 }]}>
                                    <Text style={[styles.switchTitle]}>{i18n.t('Language')} </Text>
                                </View>
                                <View style={[{ flex: 2, alignItems: 'flex-end' }]}>
                                    <Picker
                                        selectedValue={this.state.language}
                                        iosIcon={<Feather name="chevron-down" color={Colors.blue} />}
                                        mode='dropdown'
                                        textStyle={{color: Colors.blue}}
                                        style={[{width: WP(25)}]}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ language: itemValue })
                                        }>
                                        <Picker.Item label="English" value="key0" />
                                        <Picker.Item label="සිංහල" value="key1" />
                                        <Picker.Item label="தமிழ்" value="key2" />
                                    </Picker>

                                </View>
                            </View>
                        </View>

                        <View style={[styles.barBorder]}></View>

                        <View style={[styles.formSection]}>
                            <Text style={[styles.formTitle]}>{i18n.t('Support')}</Text>

                            <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                    <Text style={[styles.switchTitle]}>Ask Question</Text>
                                </View>
                                <View style={{ flex: 1 }} />
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: HP(1) }}>
                                <View style={[{ justifyContent: 'center', flex: 5 }]}>
                                    <Text style={[styles.switchTitle]}>FAQ</Text>
                                </View>
                                <View style={{ flex: 1 }} />
                            </View>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}