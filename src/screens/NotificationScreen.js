import React, { Component } from 'react';
import { View, Image, Text, ScrollView, KeyboardAvoidingView, Keyboard, Modal } from 'react-native';
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
import NavigationService from '../services/navigation';
import { Images, ApplicationStyles as Main } from '../theme';
import styles from './Styles/NotificationScreen';
import { Colors } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from 'i18n-js';


export default class NotificationScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            isEmpty: false
        }
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

                    <Right>
                        <Btn transparent icon
                            onPress={() => {
                                this.setState({
                                    isEmpty: true
                                })
                            }}
                        >
                            <Feather name="wind" size={RF(3)} color='#FFFFFF' />
                        </Btn>
                    </Right>

                </Header>
                <View style={[Main.screen.screenTitleSection]}>
                    <Text style={[Main.screen.screenTitle]}>Notifications</Text>
                </View>
                {this.state.isEmpty ?
                    <View style={[styles.emptyConteiner]}>
                        <View style={[styles.curcileView, Main.shadow]}>
                            <Image source={Images.notification} />
                        </View>
                        <Text style={[styles.emptyTitle]}>No Notification Right Now!</Text>
                    </View>
                    :
                    <ScrollView>
                        <TouchableOpacity>
                            <View style={[styles.itemCardOuter]}>
                                <View style={[styles.itemCard, Main.shadow]}>
                                    <View style={{ flex: 4 }}>
                                        <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>Lorem ipsum dolor sit amet, consetetur sadipscing...</Text>
                                        <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>1 day ago</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={Images.accepted} />
                                        <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium' }}>Accepted</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                }

            </Container>
        )
    }
}