import React, {Component} from 'react';
import {View, Text, Image, RefreshControl, Linking, Alert, Modal, TouchableHighlight, Keyboard} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import {
    Container,
    Header,
    Left,
    Right,
    Button as Btn,
} from "native-base";
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import {Button, Input} from 'react-native-elements';
import {Feather, Octicons} from '@expo/vector-icons';
import RadioButton from 'react-native-radio-button';
import NavigationService from '../services/navigation';
import {Images, ApplicationStyles as Main} from '../theme';
import styles from './Styles/RequestInformationScreen';
import stylez from './Styles/RTISubmitScreen';


import TimeAgo from 'react-native-timeago';
import {Colors} from '../theme';
import {FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView} from 'react-native-gesture-handler';
import {bindActionCreators} from "redux";
import * as Actions from "../actions";
import {connect} from "react-redux";
import {ImageBrowser} from 'expo-multiple-media-imagepicker';
import i18n from 'i18n-js';



let rtiUpdateData = {};
let rtiCurrent = {};

class RequestInformationScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            pay_amount: '',
            payment_document: null,
            reason_partial_acceptance: '',
            asking_more_time: '',
            reject_message: '',
            reject_reason: '',
            rti_answer: '',
            imageBrowserOpen: false,
            photos: [],
            errPaymentAmount: '',
            errPaymentDocument: '',
            errPartialAccepted: '',
            errAskingMoreTime: '',
            errRejecting: '',
            errRejectingReason: '',
            errRTIAnswer: '',
            params: this.props.navigation.state.params.pendingData,
            additional: false,
            modalVisible: false,
            modalVisibleAcceptPartial: false,
            modalVisiblePaymentWithAcceptPartial: false,
            modalVisibleAskingMoreTime: false,
            modalVisibleReject: false,
            modalVisibleInformationProvided: false,
            modalVisiblePaymentDocument: false,
            isValid: true,
            isValidPartialAccepted: true,
            isValidPaymentWithPartialAccepted: true,
            isValidAskingMoreTime: true,
            isValidReject: true,
            isValidRTIAnswer: true,
            isValidPaymentDocument: true
        };

        if (this.state.pay_amount != null) {
            this.setState({
                isValid: false
            })
        } else {
            this.setState({
                isValid: true
            })
        }

        if (this.state.reason_partial_acceptance != null) {
            this.setState({
                isValidPartialAccepted: false
            })
        } else {
            this.setState({
                isValidPartialAccepted: true
            })
        }

        if (this.state.pay_amount != null && this.state.reason_partial_acceptance != null) {
            this.setState({
                isValidPaymentWithPartialAccepted: false
            })
        } else {
            this.setState({
                isValidPaymentWithPartialAccepted: true
            })
        }

        if (this.state.asking_more_time != null) {
            this.setState({
                isValidAskingMoreTime: false
            })
        } else {
            this.setState({
                isValidAskingMoreTime: true
            })
        }

        if (this.state.rti_answer != null) {
            this.setState({
                isValidRTIAnswer: false
            })
        } else {
            this.setState({
                isValidRTIAnswer: true
            })
        }

        if (this.state.payment_document != null) {
            this.setState({
                isValidPaymentDocument: false
            })
        } else {
            this.setState({
                isValidPaymentDocument: true
            })
        }


        if (this.state.reject_message != null && this.state.reject_reason != null) {
            this.setState({
                isValidReject: false
            })
        } else {
            this.setState({
                isValidReject: true
            })
        }
        // this.data = [
        //     {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ', circleColor: '#009688',lineColor:'#009688'},
        //     {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
        //     {time: '12:00', title: 'Lunch'},
        //     {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688'},
        //     {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'}
        // ]

        rtiCurrent = this.state.params;

        console.log(this.state.params.rti_status);
        if (this.state.params.rti_status == 1) {
            this.data = [
                {
                    time: rtiCurrent.created_at,
                    title: 'Created',
                    description: 'RTI Request Created.',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
            ]
        } else if (this.state.params.rti_status == 2) {
            this.data = [
                {
                    time: rtiCurrent.created_at,
                    title: 'Created',
                    description: 'RTI Request Created.',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
                {
                    time: rtiCurrent.rti_accepted_at,
                    title: 'Accepted',
                    description: 'RTI Request Accepted',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
            ]
        } else if (this.state.params.rti_status == 3) {
            this.data = [
                {
                    time: rtiCurrent.created_at,
                    title: 'Created',
                    description: 'RTI Request Created.',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
                {
                    time: rtiCurrent.updated_at,
                    title: 'Accepted with payment',
                    description: 'RTI Request Accepted with Payment (Pay Amount : ' + this.state.params.rti_payment_amount + ' )',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
            ]
        } else if (this.state.params.rti_status == 4) {
            this.data = [
                {
                    time: rtiCurrent.created_at,
                    title: 'Created',
                    description: 'RTI Request Created.',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
                {
                    time: rtiCurrent.updated_at,
                    title: 'Asking more time',
                    description: 'RTI Request Asking more time ( Reason : ' + this.state.params.rti_additional_time_message + ' )',
                    circleColor: Colors.blue,
                    lineColor: Colors.blue
                },
            ]
        } else if (this.state.params.rti_status == 5) {
            this.data = [
                {
                    time: rtiCurrent.created_at,
                    title: 'Created',
                    description: 'RTI Request Created.',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
                {
                    time: rtiCurrent.rti_recjected_at,
                    title: 'Rejected',
                    description: 'RTI Request Rejected ( message : ' + this.state.params.rti_reject_message + ' / Reason : ' + this.getRejectReasonMessage(this.state.params.rti_reject_reason) + ' )',
                    circleColor: Colors.red,
                    lineColor: Colors.red
                },
            ]
        } else if (this.state.params.rti_status == 6) {
            this.data = [
                {
                    time: rtiCurrent.created_at,
                    title: 'Created',
                    description: 'RTI Request Created.',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
                {
                    time: rtiCurrent.rti_completed_at,
                    title: 'Completed',
                    description: 'RTI Request Completed ( RTI Answer : ' + this.state.params.rti_answer + ' )',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
            ]
        } else if (this.state.params.rti_status == 7) {
            this.data = [
                {
                    time: rtiCurrent.created_at,
                    title: 'Created',
                    description: 'RTI Request Created.',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
                {
                    time: rtiCurrent.updated_at,
                    title: 'Payment doc accepted',
                    description: 'RTI Request Payment Document Accepted.',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
            ]
        } else if (this.state.params.rti_status == 8) {
            this.data = [
                {
                    time: rtiCurrent.created_at,
                    title: 'Created',
                    description: 'RTI Request Created.',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
                {
                    time: rtiCurrent.rti_recjected_at,
                    title: 'Payment doc rejected',
                    description: 'RTI Request Payment Document Rejected.',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
            ]
        } else if (this.state.params.rti_status == 9) {
            this.data = [
                {
                    time: rtiCurrent.created_at,
                    title: 'Created',
                    description: 'RTI Request Created.',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
                {
                    time: rtiCurrent.rti_accepted_at,
                    title: 'Accept partial',
                    description: 'RTI Request Accepted Partial ( Reason : ' + this.state.params.tri_partial_message + ' )',
                    circleColor: Colors.offblue,
                    lineColor: Colors.offblue
                },
            ]
        } else if (this.state.params.rti_status == 10) {
            this.data = [
                {
                    time: rtiCurrent.created_at,
                    title: 'Created',
                    description: 'RTI Request Created.',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
                {
                    time: rtiCurrent.updated_at,
                    title: 'Accept partial with payment',
                    description: 'RTI Request Accept Partial with Payment ( Pay Amount : ' + this.state.params.rti_payment_amount + ' / Reason : ' + this.state.params.tri_partial_message + ' )',
                    circleColor: Colors.offblue,
                    lineColor: Colors.offblue
                },
            ]
        } else {
            this.data = [
                {
                    time: rtiCurrent.created_at,
                    title: 'Created',
                    description: 'RTI Request Created.',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
                {
                    time: rtiCurrent.rti_accepted_at,
                    title: 'Accepted',
                    description: 'RTI Request Accepted',
                    circleColor: Colors.green,
                    lineColor: Colors.green
                },
                {
                    time: rtiCurrent.rti_accepted_at,
                    title: 'Accept partial',
                    description: 'RTI Request Accept Partial',
                    circleColor: Colors.offblue,
                    lineColor: Colors.offblue
                },
                {
                    time: rtiCurrent.updated_at,
                    title: 'Accept partial with payment',
                    description: 'RTI Request Accept Partial with Payment',
                    circleColor: Colors.offblue,
                    lineColor: Colors.offblue
                },
                {
                    time: rtiCurrent.rti_recjected_at,
                    title: 'Rejected',
                    description: 'RTI Request Rejected.',
                    circleColor: Colors.red,
                    lineColor: Colors.red
                },
                {
                    time: rtiCurrent.updated_at,
                    title: 'Asking more time',
                    description: 'RTI Request Asking more time',
                    circleColor: Colors.blue,
                    lineColor: Colors.blue
                },
            ]
        }
        // this.data = [
        //     {time: '2020-02-27 10:38', title: 'Created', description: 'RTI Request Created.', circleColor: Colors.green,lineColor:Colors.green},
        //     {time: '2020-02-28 11:59', title: 'Accepted', description: 'RTI Request Accepted', circleColor: Colors.green,lineColor:Colors.green},
        //     {time: '2020-02-29 01:50', title: 'Accept Partial', description: 'RTI Request Accept Partial', circleColor: Colors.offblue,lineColor:Colors.offblue},
        //     {time: '2020-02-29 01:50', title: 'Accept Partial with Payment', description: 'RTI Request Accept Partial with Payment', circleColor: Colors.offblue,lineColor:Colors.offblue},
        //     {time: '2020-03-02 04:25', title: 'Expired', description: 'RTI Request Expired.', circleColor: Colors.red,lineColor:Colors.red},
        //     {time: '2020-02-29 05:50', title: 'Asking More Time', description: 'RTI Request Asking more time', circleColor: Colors.blue,lineColor:Colors.blue},
        // ]
    }

    componentDidMount() {
        console.log('RequestInformationScreen');
        this.setState({
            params: this.props.navigation.state.params.pendingData
        })
    }

    // onUpdateRti(rti_id, status) {
    // this.setModalVisible(true);
    // rtiUpdateData.rti_id = rti_id;
    // rtiUpdateData.status = status;
    // //
    // this.props.rtiUpdate(rtiUpdateData, (res) => {
    //     if (res) {
    //         Alert.alert(this.props.data.message);
    //         setTimeout(() => {
    //             NavigationService.navigate('HomeScreen');
    //         }, 2);
    //     } else {
    //         Alert.alert('Not Updated!');
    //     }
    // })
    // }

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
                style={{height: 100, width: 100}}
                source={{uri: item.uri}}
                key={i}
            />
        )
    }

    onUpdateRtiAnswer(rti_id, status) {
        Keyboard.dismiss();
        rtiUpdateData.rti_id = rti_id;
        rtiUpdateData.status = status;
        rtiUpdateData.rti_answer = this.state.rti_answer;
        this.props.rtiUpdate(rtiUpdateData, (res) => {
            if (res) {
                NavigationService.navigate('RequestInformationScreen', {pendingData: this.state.params})
                setTimeout(() => {
                    Alert.alert(this.props.data.message);
                    NavigationService.navigate('TabScreen')
                }, 1000);
            } else {
                Alert.alert('Not Updated!');
            }
        })
    }

    onAskingMoreTimeYes(rti_id, asking) {
        // Keyboard.dismiss();
        console.log("itz hitting")
        rtiUpdateData.rti_id = rti_id;
        rtiUpdateData.asking = asking;
        this.props.rtiUpdate(rtiUpdateData, (res) => {
            if (res) {
                NavigationService.navigate('RequestInformationScreen', {pendingData: this.state.params})
                setTimeout(() => {
                    Alert.alert(this.props.data.message);
                    NavigationService.navigate('TabScreen')
                }, 1000);
            } else {
                Alert.alert('Not Updated!');
            }
        })
    }

    onPhotoSubmit() {
        let rtiUpdateData = {};
        if (this.state.photos.length > 0) {
            this.state.photos.forEach((element, index) => {

                var getFile = {uri: element.localUri, name: element.filename, type: 'multipart/form-data'}

                rtiUpdateData.rti_id = rtiCurrent.rti_id;
                rtiUpdateData.rti_payment_file = getFile;
                this.props.rtiUpdate(rtiUpdateData, (res) => {
                    if (res) {
                        NavigationService.navigate('RequestInformationScreen', {pendingData: this.state.params})
                        setTimeout(() => {
                            Alert.alert(this.props.data.message);
                            NavigationService.navigate('TabScreen')
                        }, 1000);
                    } else {
                        Alert.alert('Not Updated!');
                    }
                })
            });
        }
    }

    onPhotoSubmitDisabled() {
        Alert.alert('Please add payment document before submit');
    }

    onUpdateRti(rti_id, status) {
        Keyboard.dismiss();
        rtiUpdateData.rti_id = rti_id;
        rtiUpdateData.status = status;
        if (status == "AcceptedWithPayment") {
            rtiUpdateData.rti_payment_amount = this.state.pay_amount;
            this.props.rtiUpdate(rtiUpdateData, (res) => {
                if (res) {
                    NavigationService.navigate('RequestInformationScreen', {pendingData: this.state.params})
                    setTimeout(() => {
                        Alert.alert(this.props.data.message);
                        NavigationService.navigate('TabScreen')
                    }, 1000);
                } else {
                    Alert.alert('Not Updated!');
                }
            })
        } else if (status == "AcceptedPartial") {
            rtiUpdateData.tri_partial_message = this.state.reason_partial_acceptance;
            this.props.rtiUpdate(rtiUpdateData, (res) => {
                if (res) {
                    NavigationService.navigate('RequestInformationScreen', {pendingData: this.state.params})
                    setTimeout(() => {
                        Alert.alert(this.props.data.message);
                        NavigationService.navigate('TabScreen')
                    }, 1000);
                } else {
                    Alert.alert('Not Updated!');
                }
            })
        } else if (status == "AskingMoreYes") {
            // rtiUpdateData.tri_partial_message = this.state.reason_partial_acceptance;
            console.log('blaaa test android');
            let rtiUpdateData = {};
            rtiUpdateData.rti_id = rti_id;
            rtiUpdateData.asking = status;
            this.props.rtiUpdate(rtiUpdateData, (res) => {
                if (res) {
                    console.log(res);
                    NavigationService.navigate('RequestInformationScreen', {pendingData: this.state.params})
                    setTimeout(() => {
                        Alert.alert(this.props.data.message);
                        NavigationService.navigate('TabScreen')
                    }, 1000);
                } else {
                    Alert.alert('Not Updated!');
                }
            })
        } else if (status == "AcceptedWithPaymentPartial") {
            rtiUpdateData.rti_payment_amount = this.state.pay_amount;
            rtiUpdateData.tri_partial_message = this.state.reason_partial_acceptance;
            this.props.rtiUpdate(rtiUpdateData, (res) => {
                if (res) {
                    NavigationService.navigate('RequestInformationScreen', {pendingData: this.state.params})
                    setTimeout(() => {
                        Alert.alert(this.props.data.message);
                        NavigationService.navigate('TabScreen')
                    }, 1000);
                } else {
                    Alert.alert('Not Updated!');
                }
            })
        } else if (status == "AskingTime") {
            rtiUpdateData.rti_additional_time_message = this.state.asking_more_time;
            this.props.rtiUpdate(rtiUpdateData, (res) => {
                if (res) {
                    NavigationService.navigate('RequestInformationScreen', {pendingData: this.state.params})
                    setTimeout(() => {
                        Alert.alert(this.props.data.message);
                        NavigationService.navigate('TabScreen')
                    }, 1000);
                } else {
                    Alert.alert('Not Updated!');
                }
            })
        } else if (status == "Rejected") {
            rtiUpdateData.rti_reject_message = this.state.reject_message;
            rtiUpdateData.rti_reject_reason = this.state.reject_reason;
            this.props.rtiUpdate(rtiUpdateData, (res) => {
                if (res) {
                    NavigationService.navigate('RequestInformationScreen', {pendingData: this.state.params})
                    setTimeout(() => {
                        Alert.alert(this.props.data.message);
                        NavigationService.navigate('TabScreen')
                    }, 1000);
                } else {
                    Alert.alert('Not Updated!');
                }
            })
        } else {
            // rtiUpdateData.rti_payment_amount = this.state.pay_amount;
            this.props.rtiUpdate(rtiUpdateData, (res) => {
                if (res) {
                    NavigationService.navigate('RequestInformationScreen', {pendingData: this.state.params})
                    setTimeout(() => {
                        Alert.alert(this.props.data.message);
                        NavigationService.navigate('TabScreen')
                    }, 1000);
                } else {
                    Alert.alert('Not Updated!');
                }
            })
        }

    }

    getRejectReasonMessage(value) {
        var message;
        switch (value) {
            case 1:
                message = "Personal information the disclosure";
                break;
            case 2:
                message = "Undermine the defence of the State or its territorial integrity, National security and Affairs";
                break;
            case 3:
                message = "Prejudice to the economy of Sri Lanka";
                break;
            case 4:
                message = "Commercial confidence, Trade secrets or Intellectual property";
                break;
            case 5:
                message = "Medical records relating to any person";
                break;
            case 6:
                message = "Communication, between a professional and a public authority withheld by law";
                break;
            case 7:
                message = "Kept confidential by reason of the existence of a fiduciary relationship";
                break;
            case 8:
                message = "Prejudice to the apprehension or prosecution of offenders";
                break;
            case 9:
                message = "Third party does not consent to information disclosure";
                break;
            case 10:
                message = "Disclosure would be in contempt of court or prejudicial to the maintenance of the authority and impartiality of the judiciary";
                break;
            case 11:
                message = "Disclosure would infringe the privileges of Parliament or of a Provincial Council";
                break;
            case 12:
                message = "Disclosure would harm the integrity of an examination being conducted";
                break;
            case 13:
                message = "Information relates to a cabinet memorandum of which a decision has not been taken";
                break;
            case 14:
                message = "Information relates to an election conducted by the Commissioner of Elections";
                break;
            default:
                message = "There are not any reason to reject";
        }
        return message;
    }


    checkPaymentAmount = (text) => {
        if (!(text.length > 0)) {
            this.setState({
                errPaymentAmount: 'Please add payment amount',
                isValid: true
            })
        } else {
            this.setState({
                errPaymentAmount: '',
            })
        }
    }

    checkPaymentDocument = (text) => {
        if (!(text.length > 0)) {
            this.setState({
                errPaymentDocument: 'Please add payment Document',
                isValidPaymentDocument: true
            })
        } else {
            this.setState({
                errPaymentDocument: '',
            })
        }
    }


    checkPartialAcceptance = (text) => {
        if (!(text.length > 0)) {
            this.setState({
                errPartialAccepted: 'Please add Reason message for partial accepted',
                isValidPartialAccepted: true
            })
        } else {
            this.setState({
                errPartialAccepted: '',
            })
        }
    }

    checkAskingMoreTime = (text) => {
        if (!(text.length > 0)) {
            this.setState({
                errAskingMoreTime: 'Please add Reason message for asking more time',
                isValidAskingMoreTime: true
            })
        } else {
            this.setState({
                errAskingMoreTime: '',
            })
        }
    }

    checkRejectReason = (text) => {
        if (!(text.length > 0)) {
            this.setState({
                errRejectingReason: 'Please add Reject Reason',
                isValidReject: true
            })
        } else {
            this.setState({
                errRejectingReason: '',
            })
        }
    }

    checkRejectMessage = (text) => {
        if (!(text.length > 0)) {
            this.setState({
                errRejecting: 'Please add Reject Message',
                isValidReject: true
            })
        } else {
            this.setState({
                errRejecting: '',
            })
        }
    }

    checkRTIAnswer = (text) => {
        if (!(text.length > 0)) {
            this.setState({
                errRTIAnswer: 'Please add RTI Answer',
                isValidRTIAnswer: true
            })
        } else {
            this.setState({
                errRTIAnswer: '',
            })
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    setModalVisibleAcceptPartial(visible) {
        this.setState({modalVisibleAcceptPartial: visible});
    }

    setModalVisiblePaymentWithAcceptPartial(visible) {
        this.setState({modalVisiblePaymentWithAcceptPartial: visible});
    }

    setModalVisibleAskingMoreTime(visible) {
        this.setState({modalVisibleAskingMoreTime: visible});
    }

    setModalVisibleReject(visible) {
        this.setState({modalVisibleReject: visible});
    }

    setModalVisibleInformationProvided(visible) {
        this.setState({modalVisibleInformationProvided: visible});
    }

    setModalVisiblePaymentDocument(visible) {
        this.setState({modalVisiblePaymentDocument: visible});
    }

    // renderStatusView = ({ item }) => {
    // if (item.rti_status == 1) {
    //     return (
    //         <TouchableOpacity>
    //             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //                 <Image source={Images.pending} />
    //                 <Text style={{ color: Colors.orange, marginTop: 5, fontFamily: 'roboto-medium' }}>Pending</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // } else if (item.rti_status == 2) {
    //     return (
    //         <TouchableOpacity>
    //             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //                 <Image source={Images.accepted}/>
    //                 <Text style={{color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium'}}>Accepted</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // } else if (item.rti_status == 5) {
    //     return (
    //         <TouchableOpacity>
    //             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //                 <Image source={Images.rejected}/>
    //                 <Text style={{color: Colors.red, marginTop: 5, fontFamily: 'roboto-medium'}}>Rejected</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // } else if (item.rti_status == 6) {
    //     return (
    //         <TouchableOpacity>
    //             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //                 <Image source={Images.completed}/>
    //                 <Text style={{color: Colors.green, marginTop: 5, fontFamily: 'roboto-medium'}}>Completed</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }
    // };


    onAdditional() {
        this.setState({
            additional: !this.state.additional
        })
    }

    isValidated = () => {
        if (this.state.pay_amount != null) {
            this.setState({
                isValid: false
            })
        } else {
            this.setState({
                isValid: true
            })
        }
    }

    isValidatedPartialAcceptance = () => {
        if (this.state.reason_partial_acceptance != null) {
            this.setState({
                isValidPartialAccepted: false
            })
        } else {
            this.setState({
                isValidPartialAccepted: true
            })
        }
    }

    isValidatedPaymentWithPartialAcceptance = () => {
        if (this.state.reason_partial_acceptance != null && this.state.pay_amount != null) {
            this.setState({
                isValidPaymentWithPartialAccepted: false
            })
        } else {
            this.setState({
                isValidPaymentWithPartialAccepted: true
            })
        }
    }

    isValidatedAskingMoreTime = () => {
        if (this.state.asking_more_time != null) {
            this.setState({
                isValidAskingMoreTime: false
            })
        } else {
            this.setState({
                isValidAskingMoreTime: true
            })
        }
    }

    isValidatedRTIAnswer = () => {
        if (this.state.rti_answer != null) {
            this.setState({
                isValidRTIAnswer: false
            })
        } else {
            this.setState({
                isValidRTIAnswer: true
            })
        }
    }

    isValidatedPaymentDocument = () => {
        if (this.state.payment_document != null) {
            this.setState({
                isValidPaymentDocument: false
            })
        } else {
            this.setState({
                isValidPaymentDocument: true
            })
        }
    }

    isValidatedReject = () => {
        if (this.state.reject_message != null && this.state.reject_reason != null) {
            this.setState({
                isValidReject: false
            })
        } else {
            this.setState({
                isValidReject: true
            })
        }
    }

    render() {
        const {goBack} = this.props.navigation;

        if (this.state.imageBrowserOpen) {
            return (
                <ImageBrowser
                    max={1} // Maximum number of pickable image. default is None
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
            <Container style={{backgroundColor: Colors.offwhite}}>
                <Header style={[{backgroundColor: Colors.blue, borderBottomWidth: 0},]} noShadow>
                    <Left>
                        <Btn transparent icon
                             onPress={() => goBack()}
                        >
                            <Feather name="arrow-left" size={RF(3)} color='#FFFFFF'/>
                        </Btn>
                    </Left>
                    <Right/>
                </Header>
                <View style={[Main.screen.screenTitleSection]}>
                    <Text style={[Main.screen.screenTitle]}>Request Information</Text>
                </View>
                <ScrollView>
                    <View style={[Main.card.reqcardStyle, Main.shadow, Main.centerView]}>
                        <View style={[Main.card.reqcardHeader]}>
                            <View style={{flexDirection: 'row', marginTop: 5}}>
                                <View style={{flex: 4}}>
                                    <Text style={[styles.titleStyle]}>{this.state.params.rti_title}</Text>
                                </View>
                                <View style={{flex: 1}}>


                                    {/*<View  data={this.state.params}*/}
                                    {/*       renderItem={this.renderStatusView}*/}
                                    {/*       keyExtractor={(item, index) => item.rti_id.toString()}*/}
                                    {/*       extraData={this.state.params}>*/}
                                    {/*</View>*/}

                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <Image source={this.state.params.rti_status == 1 ? Images.pending :
                                            this.state.params.rti_status == 2 ? Images.accepted :
                                                this.state.params.rti_status == 3 ? Images.pending :
                                                    this.state.params.rti_status == 4 ? Images.accepted :
                                                        this.state.params.rti_status == 5 ? Images.rejected :
                                                            this.state.params.rti_status == 6 ? Images.completed :
                                                                this.state.params.rti_status == 7 ? Images.accepted :
                                                                    this.state.params.rti_status == 8 ? Images.rejected :
                                                                        this.state.params.rti_status == 9 ? Images.accepted :
                                                                            this.state.params.rti_status == 10 ? Images.pending :
                                                                                this.state.params.rti_status == 11 ? Images.completed :
                                                                                    this.state.params.rti_status == 12 ? Images.pending :
                                                                                        this.state.params.rti_status == 13 ? Images.accepted :
                                                                                            this.state.params.rti_status == 14 ? Images.accepted :
                                                                                                this.state.params.rti_status == 15 ? Images.accepted :
                                                                                                    this.state.params.rti_status == 16 ? Images.rejected :
                                                                                                        Images.accepted}/>
                                        <Text style={{
                                            color: this.state.params.rti_status == 1 ? Colors.orange :
                                                this.state.params.rti_status == 2 ? Colors.blue :
                                                    this.state.params.rti_status == 3 ? Colors.orange :
                                                        this.state.params.rti_status == 4 ? Colors.blue :
                                                            this.state.params.rti_status == 5 ? Colors.red :
                                                                this.state.params.rti_status == 6 ? Colors.green :
                                                                    this.state.params.rti_status == 7 ? Colors.blue :
                                                                        this.state.params.rti_status == 8 ? Colors.red :
                                                                            this.state.params.rti_status == 9 ? Colors.blue :
                                                                                this.state.params.rti_status == 10 ? Colors.orange :
                                                                                    this.state.params.rti_status == 11 ? Colors.green :
                                                                                        this.state.params.rti_status == 12 ? Colors.orange :
                                                                                            this.state.params.rti_status == 13 ? Colors.blue :
                                                                                                this.state.params.rti_status == 14 ? Colors.blue :
                                                                                                    this.state.params.rti_status == 15 ? Colors.blue :
                                                                                                        this.state.params.rti_status == 16 ? Colors.red :
                                                                                                            Colors.blue,
                                            marginTop: 5,
                                            fontFamily: 'roboto-medium',
                                            textAlign: 'center'
                                        }}>{this.state.params.rti_status == 1 ? "Pending" :
                                            this.state.params.rti_status == 2 ? "Accepted" :
                                                this.state.params.rti_status == 3 ? "Accepted with Payment" :
                                                    this.state.params.rti_status == 4 ? "Asking Time":
                                                        this.state.params.rti_status == 5 ? "Rejected" :
                                                            this.state.params.rti_status == 6 ? "Completed" :
                                                                this.state.params.rti_status == 7 ? "Payment Document Accepted" :
                                                                    this.state.params.rti_status == 8 ? "Payment Document Rejected" :
                                                                        this.state.params.rti_status == 9 ? "Accepted Partial" :
                                                                            this.state.params.rti_status == 10 ? "Accepted Partial with Payment" :
                                                                                this.state.params.rti_status == 11 ? "Closed" :
                                                                                    this.state.params.rti_status == 12 ? "Reopen" :
                                                                                        this.state.params.rti_status == 13 ? "Support Officer Assign" :
                                                                                            this.state.params.rti_status == 14 ? "Support Officer Provide" :
                                                                                                this.state.params.rti_status == 15 ? "Support Officer Reject" :
                                                                                                    this.state.params.rti_status == 16 ? "Rejected" :
                                                                                                        "Accepted"} </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <View style={{flex: 4}}>
                                    {/*<TimeAgo style={{ color: Colors.ash }} time={this.state.params.created_at} />*/}
                                    <Text style={{
                                        fontFamily: 'roboto-regular',
                                        color: Colors.ash
                                    }}>{"Created on : " + this.state.params.created_at}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{color: Colors.ash}}>Reg no : {this.state.params.rti_id}</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <View style={{flex: 4}}>
                                    {/*<TimeAgo style={{ color: Colors.ash }} time={this.state.params.created_at} />*/}
                                    <Text style={{
                                        fontFamily: 'roboto-regular',
                                        color: Colors.ash
                                    }}>{this.state.params.rti_additional_time == null ? "Due Expire : " + this.state.params.rti_expire_at : "Due Expire : " + this.state.params.rti_additional_time}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    {/* <Text style={{color: Colors.ash}}>Reg no : {this.state.params.rti_id}</Text> */}
                                </View>
                            </View>
                        </View>

                        <View style={[styles.pointContainer]}>
                            <TouchableWithoutFeedback
                                style={{paddingBottom: HP(1)}}
                                onPress={() => {
                                    this.onAdditional()
                                }}
                            >
                                <View style={{flexDirection: 'row', marginHorizontal: WP(2), width: WP(80)}}>
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 5}}>
                                    <Text style={[styles.descriptionStyle]}>{this.state.params.rti_description}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.container, Main.timelineView]}>
                        <View style={{padding: 20}}>
                            <Text style={[styles.titleStyle]}>Timeline</Text>
                        </View>
                        <Timeline
                            style={styles.list}
                            data={this.data}
                            separator={true}
                            circleSize={20}
                            circleColor='rgb(45,156,219)'
                            lineColor='rgb(45,156,219)'
                            timeContainerStyle={{minWidth: 52, marginTop: -10}}
                            timeStyle={{
                                textAlign: 'center',
                                backgroundColor: '#ff9797',
                                color: 'white',
                                padding: 5,
                                borderRadius: 13,
                                overflow: 'hidden',
                                width: 170,
                                marginTop: 10
                            }}
                            descriptionStyle={{color: 'gray'}}
                            options={{
                                style: {paddingTop: 5}
                            }}
                        />
                    </View>


                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={[Main.centerView, {height: HP(100), backgroundColor: Colors.black}]}>
                            <View style={[Main.centerView, styles.modalStyle, Main.shadow, {
                                backgroundColor: Colors.offwhite,
                                padding: 20,
                                borderRadius: 6,
                            }]}>
                                <Input
                                    keyboardType={"number-pad"}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    containerStyle={[styles.inputContainer]}
                                    inputStyle={[styles.inputStyle]}
                                    placeholder='Payment Amount (LKR)'
                                    placeholderTextColor={Colors.ash}
                                    errorStyle={{color: 'red'}}
                                    errorMessage={this.state.errPaymentAmount}
                                    onChangeText={text => {
                                        this.setState({pay_amount: text});
                                        this.isValidated();
                                        this.checkPaymentAmount(text);
                                    }}
                                    value={this.state.pay_amount}
                                />
                                <Button
                                    disabled={this.state.isValid}
                                    title="Update"
                                    buttonStyle={[Main.button.highLightButton]}
                                    containerStyle={{width: WP(50), marginVertical: HP(2)}}
                                    titleStyle={{fontFamily: 'roboto-medium'}}
                                    onPress={() => {
                                        this.setState({
                                            modalVisible: false
                                        })
                                        this.onUpdateRti(this.state.params.rti_id, "AcceptedWithPayment");
                                    }}
                                />
                                <Button
                                    title="Cancel"
                                    buttonStyle={[Main.button.highLightButton2]}
                                    containerStyle={{width: WP(50), marginVertical: HP(2)}}
                                    titleStyle={{fontFamily: 'roboto-medium'}}
                                    onPress={() => {
                                        this.setState({
                                            modalVisible: false
                                        })
                                    }}
                                />

                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisibleAcceptPartial}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={[Main.centerView, {height: HP(100), backgroundColor: Colors.black}]}>
                            <View style={[Main.centerView, styles.modalStyle, Main.shadow, {
                                backgroundColor: Colors.offwhite,
                                padding: 20,
                                borderRadius: 6,
                            }]}>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    containerStyle={[styles.inputContainer]}
                                    inputStyle={[styles.inputStyle]}
                                    placeholder='Reason for Partial Acceptance'
                                    placeholderTextColor={Colors.ash}
                                    errorStyle={{color: 'red'}}
                                    errorMessage={this.state.errPartialAccepted}
                                    onChangeText={text => {
                                        this.setState({reason_partial_acceptance: text});
                                        this.isValidatedPartialAcceptance();
                                        this.checkPartialAcceptance(text);
                                    }}
                                    value={this.state.reason_partial_acceptance}
                                />
                                <Button
                                    disabled={this.state.isValidPartialAccepted}
                                    title="Update"
                                    buttonStyle={[Main.button.highLightButton]}
                                    containerStyle={{width: WP(50), marginVertical: HP(2)}}
                                    titleStyle={{fontFamily: 'roboto-medium'}}
                                    onPress={() => {
                                        this.setState({
                                            modalVisibleAcceptPartial: false
                                        })
                                        this.onUpdateRti(this.state.params.rti_id, "AcceptedPartial");
                                    }}
                                />
                                <Button
                                    title="Cancel"
                                    buttonStyle={[Main.button.highLightButton2]}
                                    containerStyle={{width: WP(50), marginVertical: HP(2)}}
                                    titleStyle={{fontFamily: 'roboto-medium'}}
                                    onPress={() => {
                                        this.setState({
                                            modalVisibleAcceptPartial: false
                                        })
                                    }}
                                />

                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisiblePaymentWithAcceptPartial}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={[Main.centerView, {height: HP(100), backgroundColor: Colors.black}]}>
                            <View style={[Main.centerView, styles.modalStyle, Main.shadow, {
                                backgroundColor: Colors.offwhite,
                                padding: 20,
                                borderRadius: 6,
                            }]}>
                                <Input
                                    keyboardType={"number-pad"}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    containerStyle={[styles.inputContainer]}
                                    inputStyle={[styles.inputStyle]}
                                    placeholder='Payment Amount (LKR)'
                                    placeholderTextColor={Colors.ash}
                                    errorStyle={{color: 'red'}}
                                    errorMessage={this.state.errPaymentAmount}
                                    onChangeText={text => {
                                        this.setState({pay_amount: text});
                                        this.isValidatedPaymentWithPartialAcceptance();
                                        this.checkPaymentAmount(text);
                                    }}
                                    value={this.state.pay_amount}
                                />
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    containerStyle={[styles.inputContainer]}
                                    inputStyle={[styles.inputStyle]}
                                    placeholder='Reason for Partial Acceptance'
                                    placeholderTextColor={Colors.ash}
                                    errorStyle={{color: 'red'}}
                                    errorMessage={this.state.errPartialAccepted}
                                    onChangeText={text => {
                                        this.setState({reason_partial_acceptance: text});
                                        this.isValidatedPaymentWithPartialAcceptance();
                                        this.checkPartialAcceptance(text);
                                    }}
                                    value={this.state.reason_partial_acceptance}
                                />
                                <Button
                                    disabled={this.state.isValidPaymentWithPartialAccepted}
                                    title="Update"
                                    buttonStyle={[Main.button.highLightButton]}
                                    containerStyle={{width: WP(50), marginVertical: HP(2)}}
                                    titleStyle={{fontFamily: 'roboto-medium'}}
                                    onPress={() => {
                                        this.setState({
                                            modalVisiblePaymentWithAcceptPartial: false
                                        })
                                        this.onUpdateRti(this.state.params.rti_id, "AcceptedWithPaymentPartial");
                                    }}
                                />
                                <Button
                                    title="Cancel"
                                    buttonStyle={[Main.button.highLightButton2]}
                                    containerStyle={{width: WP(50), marginVertical: HP(2)}}
                                    titleStyle={{fontFamily: 'roboto-medium'}}
                                    onPress={() => {
                                        this.setState({
                                            modalVisiblePaymentWithAcceptPartial: false
                                        })
                                    }}
                                />

                            </View>
                        </View>
                    </Modal>


                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisibleAskingMoreTime}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={[Main.centerView, {height: HP(100), backgroundColor: Colors.black}]}>
                            <View style={[Main.centerView, styles.modalStyle, Main.shadow, {
                                backgroundColor: Colors.offwhite,
                                padding: 20,
                                borderRadius: 6,
                            }]}>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    containerStyle={[styles.inputContainer]}
                                    inputStyle={[styles.inputStyle]}
                                    placeholder='Reason for asking more time'
                                    placeholderTextColor={Colors.ash}
                                    errorStyle={{color: 'red'}}
                                    errorMessage={this.state.errAskingMoreTime}
                                    onChangeText={text => {
                                        this.setState({asking_more_time: text});
                                        this.isValidatedAskingMoreTime();
                                        this.checkAskingMoreTime(text);
                                    }}
                                    value={this.state.asking_more_time}
                                />

                                <Button
                                    disabled={this.state.isValidAskingMoreTime}
                                    title="Update"
                                    buttonStyle={[Main.button.highLightButton]}
                                    containerStyle={{width: WP(50), marginVertical: HP(2)}}
                                    titleStyle={{fontFamily: 'roboto-medium'}}
                                    onPress={() => {
                                        this.setState({
                                            modalVisibleAskingMoreTime: false
                                        })
                                        this.onUpdateRti(this.state.params.rti_id, "AskingTime");
                                    }}
                                />
                                <Button
                                    title="Cancel"
                                    buttonStyle={[Main.button.highLightButton2]}
                                    containerStyle={{width: WP(50), marginVertical: HP(2)}}
                                    titleStyle={{fontFamily: 'roboto-medium'}}
                                    onPress={() => {
                                        this.setState({
                                            modalVisibleAskingMoreTime: false
                                        })
                                    }}
                                />

                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisibleReject}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={[Main.centerView, {height: HP(100), backgroundColor: Colors.black}]}>
                            <View style={[Main.centerView, styles.modalStyle, Main.shadow, {
                                backgroundColor: Colors.offwhite,
                                padding: 20,
                                borderRadius: 6,
                            }]}>

                                <ScrollView>
                                    <View>
                                        <View style={[styles.formSection2]}>
                                            <Text style={[styles.formTitle]}>Reject Reason</Text>
                                            <TouchableWithoutFeedback style={{marginBottom: 10, marginTop: 20}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 1})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 1 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 1 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 1}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 1})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Personal information the disclosure</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback style={{marginBottom: 10}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 2})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 2 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 2 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 2}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 2})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Undermine the defence of the State or its territorial
                                                            integrity,
                                                            National security and Affairs</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>


                                            <TouchableWithoutFeedback style={{marginBottom: 10}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 3})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 3 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 3 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 3}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 3})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Prejudice to the economy of Sri Lanka</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback style={{marginBottom: 10}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 4})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 4 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 4 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 4}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 4})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Commercial confidence, Trade secrets or Intellectual
                                                            property</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback style={{marginBottom: 10}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 5})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 5 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 5 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 5}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 5})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Medical records relating to any person</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback style={{marginBottom: 10}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 6})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 6 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 6 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 6}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 6})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Communication, between a professional and a public
                                                            authority
                                                            withheld by law</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback style={{marginBottom: 10}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 7})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 7 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 7 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 7}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 7})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Kept confidential by reason of the existence of a
                                                            fiduciary
                                                            relationship</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback style={{marginBottom: 10}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 8})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 8 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 8 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 8}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 8})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Prejudice to the apprehension or prosecution of
                                                            offenders</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback style={{marginBottom: 10}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 9})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 9 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 9 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 9}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 9})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Third party does not consent to information
                                                            disclosure</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback style={{marginBottom: 10}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 10})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 10 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 10 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 10}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 10})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Disclosure would be in contempt of court or prejudicial to
                                                            the
                                                            maintenance of the authority and impartiality of the
                                                            judiciary</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback style={{marginBottom: 10}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 11})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 11 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 11 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 11}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 11})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Disclosure would infringe the privileges of Parliament or
                                                            of a
                                                            Provincial Council</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback style={{marginBottom: 10}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 12})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 12 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 12 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 12}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 12})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Disclosure would harm the integrity of an examination
                                                            being
                                                            conducted</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>


                                            <TouchableWithoutFeedback style={{marginBottom: 10}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 14})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 14 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 14 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 14}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 14})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Information relates to an election conducted by the
                                                            Commissioner
                                                            of Elections</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback style={{marginBottom: 10}}
                                                                      onPress={() => {
                                                                          this.setState({reject_reason: 13})
                                                                      }}
                                            >
                                                <View style={{flexDirection: 'row', marginHorizontal: WP(2)}}>
                                                    <View style={{marginRight: WP(1)}}>
                                                        <RadioButton
                                                            innerColor={this.state.reject_reason == 13 ? Colors.blue : Colors.transash}
                                                            outerColor={this.state.reject_reason == 13 ? Colors.offblue : Colors.transash}
                                                            animation={'bounceIn'}
                                                            isSelected={this.state.reject_reason === 13}
                                                            onPress={() => {
                                                                this.setState({reject_reason: 13})
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={[Main.centerView2]}>
                                                        <Text>Information relates to a cabinet memorandum of which a
                                                            decision has not been taken</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>


                                            {/*<Input*/}
                                            {/*    autoCapitalize='none'*/}
                                            {/*    autoCorrect={false}*/}
                                            {/*    containerStyle={[styles.inputContainer]}*/}
                                            {/*    inputStyle={[styles.inputStyle]}*/}
                                            {/*    placeholder='Reason for Rejecting'*/}
                                            {/*    placeholderTextColor={Colors.ash}*/}
                                            {/*    errorStyle={{ color: 'red' }}*/}
                                            {/*    errorMessage={this.state.errRejectingReason}*/}
                                            {/*    onChangeText={text => {*/}
                                            {/*        this.setState({ reject_reason: text });*/}
                                            {/*        this.isValidatedReject();*/}
                                            {/*        this.checkRejectReason(text);*/}
                                            {/*    }}*/}
                                            {/*    value={this.state.reject_reason}*/}
                                            {/*/>*/}

                                            <Input
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                containerStyle={[styles.inputContainer]}
                                                inputStyle={[styles.inputStyle]}
                                                placeholder='Reject Message'
                                                placeholderTextColor={Colors.ash}
                                                errorStyle={{color: 'red'}}
                                                errorMessage={this.state.errRejecting}
                                                onChangeText={text => {
                                                    this.setState({reject_message: text});
                                                    this.isValidatedReject();
                                                    this.checkRejectMessage(text);
                                                }}
                                                value={this.state.reject_message}
                                            />

                                            <Button
                                                disabled={this.state.isValidReject}
                                                title="Update"
                                                buttonStyle={[Main.button.highLightButton3]}
                                                containerStyle={{width: WP(50), marginVertical: HP(2)}}
                                                titleStyle={{fontFamily: 'roboto-medium'}}
                                                onPress={() => {
                                                    this.setState({
                                                        modalVisibleReject: false
                                                    })
                                                    this.onUpdateRti(this.state.params.rti_id, "Rejected");
                                                }}
                                            />
                                            <Button
                                                title="Cancel"
                                                buttonStyle={[Main.button.highLightButton4]}
                                                containerStyle={{width: WP(50), marginVertical: HP(2)}}
                                                titleStyle={{fontFamily: 'roboto-medium'}}
                                                onPress={() => {
                                                    this.setState({
                                                        modalVisibleReject: false
                                                    })
                                                }}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>


                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisibleInformationProvided}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={[Main.centerView, {height: HP(100), backgroundColor: Colors.black}]}>
                            <View style={[Main.centerView, styles.modalStyle, Main.shadow, {
                                backgroundColor: Colors.offwhite,
                                padding: 20,
                                borderRadius: 6,
                            }]}>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    containerStyle={[styles.inputContainer]}
                                    inputStyle={[styles.inputStyle]}
                                    placeholder='Add RTI answer'
                                    placeholderTextColor={Colors.ash}
                                    errorStyle={{color: 'red'}}
                                    errorMessage={this.state.errRTIAnswer}
                                    onChangeText={text => {
                                        this.setState({rti_answer: text});
                                        this.isValidatedRTIAnswer();
                                        this.checkRTIAnswer(text);
                                    }}
                                    value={this.state.rti_answer}
                                />

                                <Button
                                    disabled={this.state.isValidRTIAnswer}
                                    title="Update"
                                    buttonStyle={[Main.button.highLightButton]}
                                    containerStyle={{width: WP(50), marginVertical: HP(2)}}
                                    titleStyle={{fontFamily: 'roboto-medium'}}
                                    onPress={() => {
                                        this.setState({
                                            modalVisibleInformationProvided: false
                                        })
                                        this.onUpdateRtiAnswer(this.state.params.rti_id, "Accepted");
                                    }}
                                />
                                <Button
                                    title="Cancel"
                                    buttonStyle={[Main.button.highLightButton2]}
                                    containerStyle={{width: WP(50), marginVertical: HP(2)}}
                                    titleStyle={{fontFamily: 'roboto-medium'}}
                                    onPress={() => {
                                        this.setState({
                                            modalVisibleInformationProvided: false
                                        })
                                    }}
                                />

                            </View>
                        </View>
                    </Modal>


                    <View style={[styles.container, Main.timelineView]}>

                        {rtiCurrent.rti_status == 2 ? <View>
                            {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>*/}
                            {/*    <View style={{width: '100%', textAlign: 'center'}}>*/}
                            {/*        <TouchableOpacity*/}
                            {/*            // onPress={() => {*/}
                            {/*            //     this.onUpdateRti(this.state.params.rti_id, "AskingTime");*/}
                            {/*            // }}*/}

                            {/*            onPress={() => {*/}
                            {/*                // Alert.alert('clicked information provided');*/}
                            {/*                this.setModalVisibleInformationProvided(true);*/}
                            {/*            }}*/}
                            {/*        >*/}

                            {/*            <View style={[styles.itemCardOuterDrawer, Main.btnBCAMT]}>*/}
                            {/*                <View style={[styles.itemCardDrawer, Main.shadow]}>*/}
                            {/*                    <Text style={{*/}
                            {/*                        color: '#FFFFFF',*/}
                            {/*                        shadowColor: 'black',*/}
                            {/*                        fontSize: 16,*/}
                            {/*                        textShadowColor: '#585858',*/}
                            {/*                        textShadowOffset: {width: 5, height: 5},*/}
                            {/*                        textShadowRadius: 10,*/}
                            {/*                        textAlign: 'center'*/}
                            {/*                    }}> Information Provided</Text>*/}
                            {/*                </View>*/}
                            {/*            </View>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*    </View>*/}
                            {/*</View>*/}

                            {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>*/}
                            {/*    <View style={{width: '100%', textAlign: 'center'}}>*/}
                            {/*        <TouchableOpacity*/}
                            {/*            // onPress={() => {*/}
                            {/*            //     this.onUpdateRti(this.state.params.rti_id, "AskingTime");*/}
                            {/*            // }}*/}

                            {/*            onPress={() => {*/}
                            {/*                this.setModalVisibleAskingMoreTime(true);*/}
                            {/*            }}*/}
                            {/*        >*/}

                            {/*            <View style={[styles.itemCardOuterDrawer, Main.btnBCAMT]}>*/}
                            {/*                <View style={[styles.itemCardDrawer, Main.shadow]}>*/}
                            {/*                    <Text style={{*/}
                            {/*                        color: '#FFFFFF',*/}
                            {/*                        shadowColor: 'black',*/}
                            {/*                        fontSize: 16,*/}
                            {/*                        textShadowColor: '#585858',*/}
                            {/*                        textShadowOffset: {width: 5, height: 5},*/}
                            {/*                        textShadowRadius: 10,*/}
                            {/*                        textAlign: 'center'*/}
                            {/*                    }}> Asking more Time</Text>*/}
                            {/*                </View>*/}
                            {/*            </View>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                        </View> : rtiCurrent.rti_status == 3 ? <View>
                            {rtiCurrent.rti_payment_file != null ?
                                <View>
                                    <View style={{marginBottom: 30}}>
                                        <Text style={{color: 'blue'}}
                                              onPress={() => Linking.openURL('http://rtiapi.proconsinfo.com/payment/' + rtiCurrent.rti_id + '/' + rtiCurrent.rti_payment_file)}>
                                            Download Payment Document
                                        </Text>
                                    </View>
                                </View> : null}
                            <View style={[stylez.selectorView]}>
                                <TouchableOpacity
                                    onPress={() => this.setState({imageBrowserOpen: true})}
                                >
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={[{flex: 2, alignItems: 'flex-end', justifyContent: 'center'}]}>
                                            <Image source={Images.selector}
                                                   style={{width: 50, height: 50, marginRight: 5,}}/>
                                        </View>
                                        <View style={[{flex: 4, alignItems: 'flex-start', justifyContent: 'center'}]}>
                                            <Text style={[stylez.borderViewText]}>Supportive documents</Text>
                                            <Text style={[stylez.borderViewText]}>(jpeg/png)</Text>
                                        </View>
                                    </View>

                                    <ScrollView horizontal={true}>
                                        {this.state.photos.map((item, i) => this.renderImage(item, i))}
                                    </ScrollView>
                                </TouchableOpacity>
                            </View>
                            {this.state.photos.length > 0 ? <View
                                style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>
                                <View style={{width: '100%', textAlign: 'center'}}>
                                    <TouchableOpacity
                                        // onPress={() => {
                                        //     this.onUpdateRti(this.state.params.rti_id, "AskingTime");
                                        // }}

                                        onPress={() => {
                                            // Alert.alert('This must pop-up payment document modal');
                                            // this.setModalVisiblePaymentDocument(true);
                                            this.onPhotoSubmit();
                                        }}
                                    >

                                        <View style={[styles.itemCardOuterDrawer, Main.btnPaymentRequested]}>
                                            <View style={[styles.itemCardDrawer, Main.shadow]}>
                                                <Text style={{
                                                    color: '#FFFFFF',
                                                    shadowColor: 'black',
                                                    fontSize: 16,
                                                    textShadowColor: '#585858',
                                                    textShadowOffset: {width: 5, height: 5},
                                                    textShadowRadius: 10,
                                                    textAlign: 'center'
                                                }}> Payment Document Upload</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View> : <View
                                style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>
                                <View style={{width: '100%', textAlign: 'center'}}>
                                    <TouchableOpacity
                                        // onPress={() => {
                                        //     this.onUpdateRti(this.state.params.rti_id, "AskingTime");
                                        // }}

                                        onPress={() => {
                                            // Alert.alert('This must pop-up payment document modal');
                                            // this.setModalVisiblePaymentDocument(true);
                                            this.onPhotoSubmitDisabled();
                                        }}
                                    >

                                        <View style={[styles.itemCardOuterDrawer, Main.btnPaymentRequestedDisabled]}
                                              disabled={true}>
                                            <View style={[styles.itemCardDrawer, Main.shadow]}>
                                                <Text style={{
                                                    color: '#FFFFFF',
                                                    shadowColor: 'black',
                                                    fontSize: 16,
                                                    textShadowColor: '#585858',
                                                    textShadowOffset: {width: 5, height: 5},
                                                    textShadowRadius: 10,
                                                    textAlign: 'center'
                                                }}> Payment Document Upload</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>}


                        </View> : rtiCurrent.rti_status == 9 ? <View>
                            {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>*/}
                            {/*    <View style={{width: '100%', textAlign: 'center'}}>*/}
                            {/*        <TouchableOpacity*/}
                            {/*            // onPress={() => {*/}
                            {/*            //     this.onUpdateRti(this.state.params.rti_id, "AskingTime");*/}
                            {/*            // }}*/}

                            {/*            onPress={() => {*/}
                            {/*                // Alert.alert('clicked information provided');*/}
                            {/*                this.setModalVisibleInformationProvided(true);*/}
                            {/*            }}*/}
                            {/*        >*/}

                            {/*            <View style={[styles.itemCardOuterDrawer, Main.btnBCAMT]}>*/}
                            {/*                <View style={[styles.itemCardDrawer, Main.shadow]}>*/}
                            {/*                    <Text style={{*/}
                            {/*                        color: '#FFFFFF',*/}
                            {/*                        shadowColor: 'black',*/}
                            {/*                        fontSize: 16,*/}
                            {/*                        textShadowColor: '#585858',*/}
                            {/*                        textShadowOffset: {width: 5, height: 5},*/}
                            {/*                        textShadowRadius: 10,*/}
                            {/*                        textAlign: 'center'*/}
                            {/*                    }}> Information Provided</Text>*/}
                            {/*                </View>*/}
                            {/*            </View>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*    </View>*/}
                            {/*</View>*/}

                            {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>*/}
                            {/*    <View style={{width: '100%', textAlign: 'center'}}>*/}
                            {/*        <TouchableOpacity*/}
                            {/*            // onPress={() => {*/}
                            {/*            //     this.onUpdateRti(this.state.params.rti_id, "AskingTime");*/}
                            {/*            // }}*/}

                            {/*            onPress={() => {*/}
                            {/*                this.setModalVisibleAskingMoreTime(true);*/}
                            {/*            }}*/}
                            {/*        >*/}

                            {/*            <View style={[styles.itemCardOuterDrawer, Main.btnBCAMT]}>*/}
                            {/*                <View style={[styles.itemCardDrawer, Main.shadow]}>*/}
                            {/*                    <Text style={{*/}
                            {/*                        color: '#FFFFFF',*/}
                            {/*                        shadowColor: 'black',*/}
                            {/*                        fontSize: 16,*/}
                            {/*                        textShadowColor: '#585858',*/}
                            {/*                        textShadowOffset: {width: 5, height: 5},*/}
                            {/*                        textShadowRadius: 10,*/}
                            {/*                        textAlign: 'center'*/}
                            {/*                    }}> Asking more Time</Text>*/}
                            {/*                </View>*/}
                            {/*            </View>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                        </View> : rtiCurrent.rti_status == 4 ? <View>

                            <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>
                                <View style={{width: '100%', textAlign: 'center'}}>
                                    <TouchableOpacity
                                        // onPress={() => {
                                        //     this.onUpdateRti(this.state.params.rti_id, "AskingTime");
                                        // }}

                                        onPress={() => {
                                            this.onUpdateRti(rtiCurrent.rti_id, "AskingMoreYes");
                                        }}
                                    >

                                        <View style={[styles.itemCardOuterDrawer, Main.btnBCAMT]}>
                                            <View style={[styles.itemCardDrawer, Main.shadow]}>
                                                <Text style={{
                                                    color: '#FFFFFF',
                                                    shadowColor: 'black',
                                                    fontSize: 16,
                                                    textShadowColor: '#585858',
                                                    textShadowOffset: {width: 5, height: 5},
                                                    textShadowRadius: 10,
                                                    textAlign: 'center'
                                                }}> Yes</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>
                                <View style={{width: '100%', textAlign: 'center'}}>
                                    <TouchableOpacity
                                        // onPress={() => {
                                        //     this.onUpdateRti(this.state.params.rti_id, "AskingTime");
                                        // }}

                                        onPress={() => {
                                            Alert.alert('Additional time confirm rejected!');
                                            // this.onAskingMoreTimeYes(this.state.params.rti_id, "AskingMoreNo");
                                        }}
                                    >

                                        <View style={[styles.itemCardOuterDrawer, Main.btnBCR]}>
                                            <View style={[styles.itemCardDrawer, Main.shadow]}>
                                                <Text style={{
                                                    color: '#FFFFFF',
                                                    shadowColor: 'black',
                                                    fontSize: 16,
                                                    textShadowColor: '#585858',
                                                    textShadowOffset: {width: 5, height: 5},
                                                    textShadowRadius: 10,
                                                    textAlign: 'center'
                                                }}> No</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View> : rtiCurrent.rti_status == 5 ? <View>
                            {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>*/}
                            {/*    <View style={{width: '100%', textAlign: 'center'}}>*/}
                            {/*        <TouchableOpacity*/}
                            {/*            // onPress={() => {*/}
                            {/*            //     this.onUpdateRti(this.state.params.rti_id, "AskingTime");*/}
                            {/*            // }}*/}

                            {/*            onPress={() => {*/}
                            {/*                Alert.alert('Clicked Appeal Request');*/}
                            {/*                // this.setModalVisibleInformationProvided(true);*/}
                            {/*            }}*/}
                            {/*        >*/}

                            {/*            <View style={[styles.itemCardOuterDrawer, Main.btnBCA]}>*/}
                            {/*                <View style={[styles.itemCardDrawer, Main.shadow]}>*/}
                            {/*                    <Text style={{*/}
                            {/*                        color: '#FFFFFF',*/}
                            {/*                        shadowColor: 'black',*/}
                            {/*                        fontSize: 16,*/}
                            {/*                        textShadowColor: '#585858',*/}
                            {/*                        textShadowOffset: {width: 5, height: 5},*/}
                            {/*                        textShadowRadius: 10,*/}
                            {/*                        textAlign: 'center'*/}
                            {/*                    }}> Appeal Request</Text>*/}
                            {/*                </View>*/}
                            {/*            </View>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                        </View> : rtiCurrent.rti_status == 10 ? <View>
                            {rtiCurrent.rti_payment_file != null ?
                                <View>
                                    <View style={{marginBottom: 30}}>
                                        <Text style={{color: 'blue'}}
                                              onPress={() => Linking.openURL('http://rtiapi.proconsinfo.com/payment/' + rtiCurrent.rti_id + '/' + rtiCurrent.rti_payment_file)}>
                                            Download Payment Document
                                        </Text>
                                    </View>
                                </View> : null}

                            <View style={[stylez.selectorView]}>
                                <TouchableOpacity
                                    onPress={() => this.setState({imageBrowserOpen: true})}
                                >
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={[{flex: 2, alignItems: 'flex-end', justifyContent: 'center'}]}>
                                            <Image source={Images.selector}
                                                   style={{width: 50, height: 50, marginRight: 5,}}/>
                                        </View>
                                        <View style={[{flex: 4, alignItems: 'flex-start', justifyContent: 'center'}]}>
                                            <Text style={[stylez.borderViewText]}>Supportive documents</Text>
                                            <Text style={[stylez.borderViewText]}>(jpeg/png)</Text>
                                        </View>
                                    </View>

                                    <ScrollView horizontal={true}>
                                        {this.state.photos.map((item, i) => this.renderImage(item, i))}
                                    </ScrollView>
                                </TouchableOpacity>
                            </View>
                            {this.state.photos.length > 0 ? <View
                                style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>
                                <View style={{width: '100%', textAlign: 'center'}}>
                                    <TouchableOpacity
                                        // onPress={() => {
                                        //     this.onUpdateRti(this.state.params.rti_id, "AskingTime");
                                        // }}

                                        onPress={() => {
                                            // Alert.alert('This must pop-up payment document modal');
                                            // this.setModalVisiblePaymentDocument(true);
                                            this.onPhotoSubmit();
                                        }}
                                    >

                                        <View style={[styles.itemCardOuterDrawer, Main.btnPaymentRequested]}>
                                            <View style={[styles.itemCardDrawer, Main.shadow]}>
                                                <Text style={{
                                                    color: '#FFFFFF',
                                                    shadowColor: 'black',
                                                    fontSize: 16,
                                                    textShadowColor: '#585858',
                                                    textShadowOffset: {width: 5, height: 5},
                                                    textShadowRadius: 10,
                                                    textAlign: 'center'
                                                }}> Payment Document Upload</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View> : <View
                                style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>
                                <View style={{width: '100%', textAlign: 'center'}}>
                                    <TouchableOpacity
                                        // onPress={() => {
                                        //     this.onUpdateRti(this.state.params.rti_id, "AskingTime");
                                        // }}

                                        onPress={() => {
                                            // Alert.alert('This must pop-up payment document modal');
                                            // this.setModalVisiblePaymentDocument(true);
                                            this.onPhotoSubmitDisabled();
                                        }}
                                    >

                                        <View style={[styles.itemCardOuterDrawer, Main.btnPaymentRequestedDisabled]}
                                              disabled={true}>
                                            <View style={[styles.itemCardDrawer, Main.shadow]}>
                                                <Text style={{
                                                    color: '#FFFFFF',
                                                    shadowColor: 'black',
                                                    fontSize: 16,
                                                    textShadowColor: '#585858',
                                                    textShadowOffset: {width: 5, height: 5},
                                                    textShadowRadius: 10,
                                                    textAlign: 'center'
                                                }}> Payment Document Upload</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>}


                            {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>*/}
                            {/*    <View style={{width: '100%', textAlign: 'center'}}>*/}
                            {/*        <TouchableOpacity*/}
                            {/*            // onPress={() => {*/}
                            {/*            //     this.onUpdateRti(this.state.params.rti_id, "AskingTime");*/}
                            {/*            // }}*/}

                            {/*            onPress={() => {*/}
                            {/*                Alert.alert('This status for payment Requested with partial Acceptance');*/}
                            {/*                // this.setModalVisibleAskingMoreTime(true);*/}
                            {/*            }}*/}
                            {/*        >*/}

                            {/*            <View style={[styles.itemCardOuterDrawer, Main.btnPaymentRequested]}>*/}
                            {/*                <View style={[styles.itemCardDrawer, Main.shadow]}>*/}
                            {/*                    <Text style={{*/}
                            {/*                        color: '#FFFFFF',*/}
                            {/*                        shadowColor: 'black',*/}
                            {/*                        fontSize: 16,*/}
                            {/*                        textShadowColor: '#585858',*/}
                            {/*                        textShadowOffset: {width: 5, height: 5},*/}
                            {/*                        textShadowRadius: 10,*/}
                            {/*                        textAlign: 'center'*/}
                            {/*                    }}> Payment Document Upload</Text>*/}
                            {/*                </View>*/}
                            {/*            </View>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                        </View> : null}

                        {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>*/}
                        {/*    <View style={{width: '100%', textAlign: 'center'}}>*/}
                        {/*        <TouchableOpacity*/}
                        {/*            onPress={() => {*/}
                        {/*                this.onUpdateRti(this.state.params.rti_id, "Accepted");*/}
                        {/*            }}*/}
                        {/*        >*/}

                        {/*            <View style={[styles.itemCardOuterDrawer, Main.btnBCA]}>*/}
                        {/*                <View style={[styles.itemCardDrawer, Main.shadow]}>*/}
                        {/*                    <Text style={{*/}
                        {/*                        color: '#FFFFFF',*/}
                        {/*                        shadowColor: 'black',*/}
                        {/*                        fontSize: 16,*/}
                        {/*                        textShadowColor: '#585858',*/}
                        {/*                        textShadowOffset: {width: 5, height: 5},*/}
                        {/*                        textShadowRadius: 10,*/}
                        {/*                        textAlign: 'center'*/}
                        {/*                    }}> Accept</Text>*/}
                        {/*                </View>*/}
                        {/*            </View>*/}
                        {/*        </TouchableOpacity>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                        {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>*/}
                        {/*    <View style={{width: '100%', textAlign: 'center'}}>*/}
                        {/*        <TouchableOpacity*/}
                        {/*            // onPress={() => {*/}
                        {/*            //     this.onUpdateRti(this.state.params.rti_id, "AcceptedWithPayment");*/}
                        {/*            // }}*/}
                        {/*            onPress={() => {*/}
                        {/*                this.setModalVisible(true);*/}
                        {/*            }}*/}
                        {/*        >*/}

                        {/*            <View style={[styles.itemCardOuterDrawer, Main.btnBCA]}>*/}
                        {/*                <View style={[styles.itemCardDrawer, Main.shadow]}>*/}
                        {/*                    <Text style={{*/}
                        {/*                        color: '#FFFFFF',*/}
                        {/*                        shadowColor: 'black',*/}
                        {/*                        fontSize: 16,*/}
                        {/*                        textShadowColor: '#585858',*/}
                        {/*                        textShadowOffset: {width: 5, height: 5},*/}
                        {/*                        textShadowRadius: 10,*/}
                        {/*                        textAlign: 'center'*/}
                        {/*                    }}> Accept with Payment</Text>*/}
                        {/*                </View>*/}
                        {/*            </View>*/}
                        {/*        </TouchableOpacity>*/}
                        {/*    </View>*/}
                        {/*</View>*/}

                        {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>*/}
                        {/*    <View style={{width: '100%', textAlign: 'center'}}>*/}
                        {/*        <TouchableOpacity*/}
                        {/*            onPress={() => {*/}
                        {/*                this.setModalVisibleAcceptPartial(true);*/}
                        {/*            }}*/}
                        {/*            // onPress={() => {*/}
                        {/*            //     this.onUpdateRti(this.state.params.rti_id, "AcceptedPartial");*/}
                        {/*            // }}*/}
                        {/*        >*/}

                        {/*            <View style={[styles.itemCardOuterDrawer, Main.btnBCAp]}>*/}
                        {/*                <View style={[styles.itemCardDrawer, Main.shadow]}>*/}
                        {/*                    <Text style={{*/}
                        {/*                        color: '#FFFFFF',*/}
                        {/*                        shadowColor: 'black',*/}
                        {/*                        fontSize: 16,*/}
                        {/*                        textShadowColor: '#585858',*/}
                        {/*                        textShadowOffset: {width: 5, height: 5},*/}
                        {/*                        textShadowRadius: 10,*/}
                        {/*                        textAlign: 'center'*/}
                        {/*                    }}> Accept Partial</Text>*/}
                        {/*                </View>*/}
                        {/*            </View>*/}
                        {/*        </TouchableOpacity>*/}
                        {/*    </View>*/}
                        {/*</View>*/}

                        {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>*/}
                        {/*    <View style={{width: '100%', textAlign: 'center'}}>*/}
                        {/*        <TouchableOpacity*/}
                        {/*            // onPress={() => {*/}
                        {/*            //     this.onUpdateRti(this.state.params.rti_id, "AcceptedWithPaymentPartial");*/}
                        {/*            // }}*/}

                        {/*            onPress={() => {*/}
                        {/*                this.setModalVisiblePaymentWithAcceptPartial(true);*/}
                        {/*            }}*/}
                        {/*        >*/}

                        {/*            <View style={[styles.itemCardOuterDrawer, Main.btnBCAp]}>*/}
                        {/*                <View style={[styles.itemCardDrawer, Main.shadow]}>*/}
                        {/*                    <Text style={{*/}
                        {/*                        color: '#FFFFFF',*/}
                        {/*                        shadowColor: 'black',*/}
                        {/*                        fontSize: 16,*/}
                        {/*                        textShadowColor: '#585858',*/}
                        {/*                        textShadowOffset: {width: 5, height: 5},*/}
                        {/*                        textShadowRadius: 10,*/}
                        {/*                        textAlign: 'center'*/}
                        {/*                    }}> Accept Partial with Payment</Text>*/}
                        {/*                </View>*/}
                        {/*            </View>*/}
                        {/*        </TouchableOpacity>*/}
                        {/*    </View>*/}
                        {/*</View>*/}

                        {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>*/}
                        {/*    <View style={{width: '100%', textAlign: 'center'}}>*/}
                        {/*        <TouchableOpacity*/}
                        {/*            // onPress={() => {*/}
                        {/*            //     this.onUpdateRti(this.state.params.rti_id, "Rejected");*/}
                        {/*            // }}*/}
                        {/*            onPress={() => {*/}
                        {/*                this.setModalVisibleReject(true);*/}
                        {/*            }}*/}
                        {/*        >*/}

                        {/*            <View style={[styles.itemCardOuterDrawer, Main.btnBCR]}>*/}
                        {/*                <View style={[styles.itemCardDrawer, Main.shadow]}>*/}
                        {/*                    <Text style={{*/}
                        {/*                        color: '#FFFFFF',*/}
                        {/*                        shadowColor: 'black',*/}
                        {/*                        fontSize: 16,*/}
                        {/*                        textShadowColor: '#585858',*/}
                        {/*                        textShadowOffset: {width: 5, height: 5},*/}
                        {/*                        textShadowRadius: 10,*/}
                        {/*                        textAlign: 'center'*/}
                        {/*                    }}> Reject</Text>*/}
                        {/*                </View>*/}
                        {/*            </View>*/}
                        {/*        </TouchableOpacity>*/}
                        {/*    </View>*/}
                        {/*</View>*/}

                        {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: 10}}>*/}
                        {/*    <View style={{width: '100%', textAlign: 'center'}}>*/}
                        {/*        <TouchableOpacity*/}
                        {/*            // onPress={() => {*/}
                        {/*            //     this.onUpdateRti(this.state.params.rti_id, "AskingTime");*/}
                        {/*            // }}*/}

                        {/*            onPress={() => {*/}
                        {/*                this.setModalVisibleAskingMoreTime(true);*/}
                        {/*            }}*/}
                        {/*        >*/}

                        {/*            <View style={[styles.itemCardOuterDrawer, Main.btnBCAMT]}>*/}
                        {/*                <View style={[styles.itemCardDrawer, Main.shadow]}>*/}
                        {/*                    <Text style={{*/}
                        {/*                        color: '#FFFFFF',*/}
                        {/*                        shadowColor: 'black',*/}
                        {/*                        fontSize: 16,*/}
                        {/*                        textShadowColor: '#585858',*/}
                        {/*                        textShadowOffset: {width: 5, height: 5},*/}
                        {/*                        textShadowRadius: 10,*/}
                        {/*                        textAlign: 'center'*/}
                        {/*                    }}> Asking more Time</Text>*/}
                        {/*                </View>*/}
                        {/*            </View>*/}
                        {/*        </TouchableOpacity>*/}
                        {/*    </View>*/}
                        {/*</View>*/}


                    </View>
                    {/*<View style={[Main.card.reqcardOuter]}>*/}
                    {/*</View>*/}
                </ScrollView>
            </Container>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.rtiDataReducer.loading,
        data: state.rtiDataReducer.data,
        error: state.rtiDataReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RequestInformationScreen);
