
import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Modal, Image, Keyboard, Alert } from "react-native";
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
import { Input, Button, CheckBox } from 'react-native-elements';
import AnimatedLoader from 'react-native-animated-loader';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import styles from './Styles/RTISubmitScreen';
import NavigationService from '../services/navigation';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { ImageBrowser } from 'expo-multiple-media-imagepicker';

// globle variables
import '../global';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions
import i18n from 'i18n-js';


let rti_req_format = [];
let rti_request_points = [];

class RTISubmitScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isValid: false,
            isLoading: false,
            isUploading: false,
            checkedAll: false,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            content: '',
            title: '',
            point: '',
            errContent: '',
            errTitle: '',
            modalVisible: false,
            errormodalVisible: false,
            pointsmodalVisible: false,
            imageBrowserOpen: false,
            photos: []
        };
    }

    /**
     * sum=bmit the rti request to the api
     */
    onSubmit() {
        Keyboard.dismiss();
        const formData = new FormData();
        formData.append('lang', global.RTIRequest.lang);
        formData.append('rti_org_id', global.RTIRequest.rti_org_id);
        formData.append('rti_org_type', global.RTIRequest.rti_org_type);
        formData.append('rti_gender', '1');
        formData.append('rti_first_name', global.RTIRequest.rti_first_name);
        formData.append('rti_address1', global.RTIRequest.rti_address1);
        formData.append('rti_address2', global.RTIRequest.rti_address2);
        formData.append('rti_city', global.RTIRequest.rti_city);
        formData.append('rti_district', global.RTIRequest.rti_district);
        formData.append('rti_mobile', global.RTIRequest.rti_mobile);
        // formData.append('rti_mobile', '94771847392');
        formData.append('rti_sms_enable', global.RTIRequest.rti_sms_enable);
        formData.append('rti_email', global.RTIRequest.rti_email);
        formData.append('rti_user_type', global.RTIRequest.rti_user_type);
        if ((global.RTIRequest.rti_user_type == 1) && (global.RTIRequest.rti_is_srilankan == 'YES')) {
            formData.append('rti_is_srilankan', global.RTIRequest.rti_is_srilankan);
        }
        if ((global.RTIRequest.rti_user_type == 2) && (global.RTIRequest.rti_share_holder_citizen == 'YES')) {
            formData.append('rti_share_holder_citizen', global.RTIRequest.rti_share_holder_citizen);
        }
        formData.append('rti_title', this.state.title);
        formData.append('rti_description', this.state.content);
        formData.append('rti_is_expedite', 'YES');
        formData.append('rti_expedite_message', 'sample expedite');
        formData.append('rti_agree', '1');

        if (this.state.photos.length > 0) {
            this.state.photos.forEach((element, index) => {
                formData.append('rti_request_support_files[' + [index] + ']', { uri: element.localUri, name: element.filename, type: 'multipart/form-data' });
            });
        }

        if (rti_req_format.length) {
            rti_req_format.forEach((element, index) => {
                formData.append('rti_req_format[' + [index] + ']', element);
            });
        }

        if (rti_request_points.length) {
            rti_request_points.forEach((element, index) => {
                formData.append('rti_request_points[' + [index] + ']', element);
            });
        }
        

        this.setState({
            isUploading: true,
            isLoading: true,
        })
        this.props.RTISubmit(formData, res => {

            if (res && this.props.data.errors) {
              console.log('dimma getting this')
              console.log(this.props.data.errors.customMessages)
                this.setState({
                    isLoading: false,
                    errormodalVisible: true,
                    isUploading: false
                })
                Alert.alert(this.props.data.errors.customMessages);
                rti_req_format = []
                rti_request_points = []
            } else if (res) {
                this.setState({
                    isLoading: false,
                    modalVisible: true,
                    isUploading: false
                })
                rti_req_format = []
                rti_request_points = []
            }else{
              this.setState({
                  isLoading: false,
                  // modalVisible: true,
                  isUploading: false
              })
              console.log('dimma getting this too')
              Alert.alert('Please complete all inputs before submit');
            }
        })
    }

    /**
     * check the title is empty
     */
    checkTitle = (text) => {
        if (!(text.length > 0)) {
            this.setState({
                errTitle: 'Please add a title',
            })
        } else {
            this.setState({
                errTitle: '',
            })
        }
    }

    /**
     * check the content is empty
     */
    checkContent = (text) => {
        if (!(text.length > 0)) {
            this.setState({
                errContent: 'Please add a title',
            })
        } else {
            this.setState({
                errContent: '',
            })
        }
    }

    /**
     *
     */
    checkPoints = (text) => {
        if (!(text.length > 0)) {
            this.setState({
                ispointValid: false,
            })
        } else {
            this.setState({
                ispointValid: true,
            })
        }
    }

    /**
    * check the validation
    */
    isValidated = () => {
        if ((this.state.title != '') && (this.state.content != '') && (rti_req_format.length > 0) && (rti_request_points.length > 0)) {
            this.setState({
                isValid: true
            })
        } else {
            this.setState({
                isValid: false
            })
        }
    }

    renderPointsItems = () => {
        return rti_request_points.map((item) => {
            return (
                <View style={{ flexDirection: 'row', borderRadius: 5, backgroundColor: Colors.transash, padding: 10, marginBottom: 10 }}>
                    <View style={{ flex: 6 }}>
                        <Text>{item}</Text>
                    </View>
                    <View style={[{ flex: 1 }, Main.centerView]}>
                        <TouchableOpacity
                            onPress={() => {
                                const index = rti_request_points.indexOf(item);
                                if (index > -1) {
                                    rti_request_points.splice(index, 1);
                                }
                            }}>
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })
    }

    addPonints = (value) => {
        rti_request_points.push(value)
        this.setState({
            point: ''
        })
        console.log(rti_request_points)
    }

    async componentDidMount() {
        Permissions.askAsync(Permissions.CAMERA_ROLL).then(d => console.log(d))
    }

    imageBrowserCallback = (callback) => {
        callback.then((photos) => {
            // console.log(photos)
            this.setState({
                imageBrowserOpen: false,
                photos: photos
            })
        }).catch((e) => console.log('err - ', e))
    }

    renderImage(item, i) {
        return (
            <Image
                style={{ height: 100, width: 100 }}
                source={{ uri: item.uri }}
                key={i}
            />
        )
    }

    render() {

        const { goBack } = this.props.navigation;

        if (this.state.imageBrowserOpen) {
            return (
                <ImageBrowser
                    max={3} // Maximum number of pickable image. default is None
                    headerCloseText={'Close'} // Close button text on header. default is 'Close'.
                    headerDoneText={'Done'} // Done button text on header. default is 'Done'.
                    headerButtonColor={Colors.blue} // Button color on header.
                    headerSelectText={'selected'} // Word when picking.  default is 'n selected'.
                    // mediaSubtype={'images'} // Only iOS, Filter by MediaSubtype. default is display all.
                    badgeColor={Colors.blue} // Badge color when picking.
                    emptyText={'Empty'} // Empty Text
                    callback={this.imageBrowserCallback} // Callback functinon on press Done or Cancel Button. Argument is Asset Infomartion of the picked images wrapping by the Promise.
                />
            )
        }

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
                    visible={this.state.isUploading}
                    overlayColor="rgba(0,0,0,0.35)"
                    source={Images.animatedLoader}
                    animationStyle={Main.lottie}
                    speed={1}
                />

                <View style={[styles.cardOuter]}>
                    <View style={[Main.shadow, styles.cardStyle]}>
                        <Text style={[styles.title]}>{i18n.t('RTI Information')}</Text>
                        <KeyboardAvoidingView behavior="padding" enabled>
                            <View style={[Main.centerView]}>
                                <ScrollView style={[styles.scrollContainer]}>
                                    <Input
                                        autoCapitalize='none'
                                        containerStyle={[styles.inputContainer]}
                                        inputStyle={[styles.inputStyle]}
                                        placeholder='Title of your request *'
                                        errorStyle={{ color: 'red' }}
                                        errorMessage={this.state.errTitle}
                                        onChangeText={text => {
                                            this.setState({ title: text });
                                            this.isValidated();
                                            this.checkTitle(text);
                                        }}
                                        value={this.state.title}
                                    />
                                    <Input
                                        autoCapitalize='none'
                                        containerStyle={[styles.inputContainer]}
                                        inputStyle={[styles.inputStyle]}
                                        placeholder='Your request in brief *'
                                        errorStyle={{ color: 'red' }}
                                        errorMessage={this.state.errContent}
                                        onChangeText={text => {
                                            this.setState({ content: text });
                                            this.isValidated();
                                            this.checkContent(text);
                                        }}
                                        value={this.state.content}
                                    />
                                    <View style={[styles.someTestView]}>
                                        <Text style={[styles.borderViewText]}>Description : A brief and clear description of the information you’d like to receive. Please be as specific as possible</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            pointsmodalVisible: true
                                        })
                                    }}>
                                        <View style={[styles.borderView]}>
                                            <Text style={[styles.borderViewText]}>Request Points</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <View style={[styles.selectorView]}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ imageBrowserOpen: true })}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={[{ flex: 2, alignItems: 'flex-end', justifyContent: 'center' }]}>
                                                    <Image source={Images.selector} style={{ width: 50, height: 50, marginRight: 5, }} />
                                                </View>
                                                <View style={[{ flex: 4, alignItems: 'flex-start', justifyContent: 'center' }]}>
                                                    <Text style={[styles.borderViewText]}>Supportive documents</Text>
                                                    <Text style={[styles.borderViewText]}>(jpeg/png)</Text>
                                                </View>
                                            </View>

                                            <ScrollView horizontal={true}>
                                                {this.state.photos.map((item, i) => this.renderImage(item, i))}
                                            </ScrollView>
                                        </TouchableOpacity>
                                    </View>

                                    <CheckBox
                                        title='All Requesting Format'
                                        textStyle={{ fontFamily: 'roboto-regular', fontWeight: '400', color: Colors.black }}
                                        checked={this.state.checkedAll}
                                        containerStyle={{ backgroundColor: Colors.transparent, borderColor: Colors.transparent, padding: 0, }}
                                        onPress={() => {
                                            this.setState({
                                                checkedAll: !this.state.checkedAll
                                            })
                                            setTimeout(() => {
                                                if (this.state.checkedAll) {
                                                    rti_req_format.push(1, 2, 3, 4, 5)
                                                } else {
                                                    rti_req_format = [];
                                                }
                                                this.isValidated();
                                            }, 1);
                                        }}
                                    />
                                    <View style={{ paddingLeft: 10 }}>
                                        <CheckBox
                                            title='Email'
                                            textStyle={{ fontFamily: 'roboto-regular', fontWeight: '400', color: Colors.black }}
                                            checked={this.state.checked1 || this.state.checkedAll}
                                            containerStyle={{ backgroundColor: Colors.transparent, borderColor: Colors.transparent, padding: 0, margin: 0, }}
                                            onPress={() => {
                                                this.setState({
                                                    checked1: !this.state.checked1
                                                })
                                                setTimeout(() => {
                                                    if (this.state.checked1) {
                                                        rti_req_format.push(1)
                                                    } else {
                                                        const index = rti_req_format.indexOf(1);
                                                        if (index > -1) {
                                                            rti_req_format.splice(index, 1);
                                                        }
                                                    }
                                                    this.isValidated();
                                                }, 1);
                                            }}
                                        />
                                        <CheckBox
                                            title='Inspect relevent work, documents records'
                                            textStyle={{ fontFamily: 'roboto-regular', fontWeight: '400', color: Colors.black }}
                                            checked={this.state.checked2 || this.state.checkedAll}
                                            containerStyle={{ backgroundColor: Colors.transparent, borderColor: Colors.transparent, padding: 0, margin: 0, }}
                                            onPress={() => {
                                                this.setState({
                                                    checked2: !this.state.checked2
                                                })
                                                setTimeout(() => {
                                                    if (this.state.checked2) {
                                                        rti_req_format.push(2)
                                                    } else {
                                                        const index = rti_req_format.indexOf(2);
                                                        if (index > -1) {
                                                            rti_req_format.splice(index, 1);
                                                        }
                                                    }
                                                    this.isValidated();
                                                }, 1);
                                            }}
                                        />
                                        <CheckBox
                                            title='Take notes, extracts or certified copies'
                                            textStyle={{ fontFamily: 'roboto-regular', fontWeight: '400', color: Colors.black }}
                                            checked={this.state.checked3 || this.state.checkedAll}
                                            containerStyle={{ backgroundColor: Colors.transparent, borderColor: Colors.transparent, padding: 0, margin: 0, }}
                                            onPress={() => {
                                                this.setState({
                                                    checked3: !this.state.checked3
                                                })
                                                setTimeout(() => {
                                                    if (this.state.checked3) {
                                                        rti_req_format.push(3)
                                                    } else {
                                                        const index = rti_req_format.indexOf(3);
                                                        if (index > -1) {
                                                            rti_req_format.splice(index, 1);
                                                        }
                                                    }
                                                    this.isValidated();
                                                }, 1);
                                            }}
                                        />
                                        <CheckBox
                                            title='CD / DVD or other electronic format'
                                            textStyle={{ fontFamily: 'roboto-regular', fontWeight: '400', color: Colors.black }}
                                            checked={this.state.checked4 || this.state.checkedAll}
                                            containerStyle={{ backgroundColor: Colors.transparent, borderColor: Colors.transparent, padding: 0, margin: 0, }}
                                            onPress={() => {
                                                this.setState({
                                                    checked4: !this.state.checked4
                                                })
                                                setTimeout(() => {
                                                    if (this.state.checked4) {
                                                        rti_req_format.push(4)
                                                    } else {
                                                        const index = rti_req_format.indexOf(4);
                                                        if (index > -1) {
                                                            rti_req_format.splice(index, 1);
                                                        }
                                                    }
                                                    this.isValidated();
                                                }, 1);
                                            }}
                                        />
                                        <CheckBox
                                            title='Other'
                                            textStyle={{ fontFamily: 'roboto-regular', fontWeight: '400', color: Colors.black }}
                                            checked={this.state.checked5 || this.state.checkedAll}
                                            containerStyle={{ backgroundColor: Colors.transparent, borderColor: Colors.transparent, padding: 0, margin: 0, }}
                                            onPress={() => {
                                                this.setState({
                                                    checked5: !this.state.checked5
                                                })
                                                setTimeout(() => {
                                                    if (this.state.checked5) {
                                                        rti_req_format.push(5)
                                                    } else {
                                                        const index = rti_req_format.indexOf(5);
                                                        if (index > -1) {
                                                            rti_req_format.splice(index, 1);
                                                        }
                                                    }
                                                    this.isValidated();
                                                }, 1);
                                            }}
                                        />
                                    </View>

                                </ScrollView>
                                <Button
                                    title="SUBMIT"
                                    // disabled={!this.state.isValid}
                                    buttonStyle={[Main.button.highLightButton]}
                                    containerStyle={{ width: WP(80), marginVertical: HP(2) }}
                                    titleStyle={{ fontFamily: 'roboto-medium' }}
                                    loading={this.state.isLoading}
                                    onPress={() => {
                                        this.onSubmit()
                                    }}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </View>

                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={[Main.centerView, { height: HP(100), backgroundColor: Colors.black }]}>
                        <View style={[Main.centerView, styles.modalStyle, Main.shadow]}>
                            <Image source={Images.submited} style={{ width: 70, height: 70, marginVertical: 10 }} />
                            <Text style={[styles.modalTitle]}>Thank You</Text>
                            <View style={{ width: WP(40) }}>
                                <Text style={{ textAlign: 'center' }}>Your RTI request has been submitted</Text>
                            </View>
                            <Text style={[styles.refnoStyle]}>REG NO : {this.state.modalVisible ? this.props.data.rti.rti_id : null}</Text>
                            <View style={{ width: WP(40) }}>
                                <Text style={{ textAlign: 'center' }}>You will receive an acknowledgment from the information officer of the relevant public organization within 14 working days</Text>
                            </View>

                            <Button
                                title="DONE"
                                disabled={!this.state.isValid}
                                buttonStyle={[Main.button.highLightButton]}
                                containerStyle={{ width: WP(50), marginVertical: HP(2) }}
                                titleStyle={{ fontFamily: 'roboto-medium' }}
                                onPress={() => {
                                    this.setState({
                                        modalVisible: false
                                    })
                                    NavigationService.navigate('TabScreen');
                                }}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.errormodalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={[Main.centerView, { height: HP(100), backgroundColor: Colors.black }]}>
                        <View style={[Main.centerView, styles.modalStyle, Main.shadow]}>
                            <Image source={Images.wrong} style={{ width: 70, height: 70, marginVertical: 10 }} />
                            <Text style={[styles.modalTitle]}>Somthing is Wrong!</Text>
                            <View style={{ width: WP(40) }}>
                                <Text style={{ textAlign: 'center' }}>Your RTI request has been not been submitted</Text>
                            </View>
                            <Text style={[styles.refnoStyle]}>Please try again</Text>
                            <View style={{ width: WP(40) }}>
                                <Text style={{ textAlign: 'center' }}>Please check the details that you added are correct!</Text>
                            </View>

                            <Button
                                title="DONE"
                                disabled={!this.state.isValid}
                                buttonStyle={[Main.button.highLightButton]}
                                containerStyle={{ width: WP(50), marginVertical: HP(2) }}
                                titleStyle={{ fontFamily: 'roboto-medium' }}
                                onPress={() => {
                                    this.setState({
                                        modalVisible: false
                                    })
                                    NavigationService.navigate('TabScreen');
                                }}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.pointsmodalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={[Main.centerView, { height: HP(100), backgroundColor: Colors.black }]}>
                        <View style={[Main.centerView, styles.pointsmodalStyle, Main.shadow]}>
                            <Button
                                title="X"
                                containerStyle={{ left: WP(38), top: -HP(1) }}
                                buttonStyle={[{ backgroundColor: Colors.blue, height: HP(6), width: HP(6), borderRadius: HP(3) }]}
                                onPress={() => {
                                    this.setState({
                                        pointsmodalVisible: false
                                    })
                                }}
                            />
                            <Input
                                autoCapitalize='none'
                                containerStyle={[styles.inputContainer, { marginBottom: 3 }]}
                                inputStyle={[styles.inputStyle]}
                                placeholder='Points of the request'
                                errorStyle={{ color: 'red' }}
                                errorMessage={this.state.errTitle}
                                onChangeText={text => {
                                    this.setState({ point: text });
                                    // this.isValidated();
                                    this.checkPoints(text);
                                }}
                                value={this.state.point}
                            />

                            {this.renderPointsItems()}

                            <Button
                                title="ADD POINTS"
                                disabled={!this.state.ispointValid}
                                buttonStyle={[Main.button.highLightButton]}
                                containerStyle={{ width: WP(50), marginVertical: HP(2) }}
                                titleStyle={{ fontFamily: 'roboto-medium' }}
                                onPress={() => {
                                    this.addPonints(this.state.point);
                                }}
                            />
                        </View>
                    </View>
                </Modal>

            </Container>
        )
    }
}


function mapStateToProps(state, props) {
    return {
        loading: state.createRequestDataReducer.loading,
        data: state.createRequestDataReducer.data,
        error: state.createRequestDataReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RTISubmitScreen);
