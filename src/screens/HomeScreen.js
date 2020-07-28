import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, RefreshControl } from "react-native";
import { Images, ApplicationStyles as Main, Colors } from '../theme';
import {
    heightPercentageToDP as hpstyle,
    widthPercentageToDP as wpstyle,
   } from 'react-native-responsive-screen'
import styles from './Styles/HomeScreen';
import { TouchableOpacity, ScrollView, FlatList } from 'react-native-gesture-handler';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import NavigationService from "../services/navigation"; //Import your actions
import i18n from 'i18n-js';

import * as Device from 'expo-device';

console.log("dimma");

let accepted = 0;
let pending = 0;
let completed = 0;
let rejected = 0;

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            data: [],
            acceptedCount: 0,
            pendingCount: 0,
            completedCount: 0,
            rejectedCount: 0,
        };
        this.onRefresh.bind(this)
          this.onLoadCount();
    }

    componentDidMount() {
        this.onLoadAllArticals();
        this.onLoadCount();

        console.log("dimma data fetch");
        console.log(this.state.data)
    }

    onAccepted() {
        console.log('navigate to accepted screen')
    }

    onCompleted() {
        console.log('navigate to completed screen')
    }

    onPending() {
        console.log('navigate to pending screen')
    }

    onRejected() {
        console.log('navigate to rejected screen')
    }

    onLoadCount = () => {
        this.props.loadCountRequestList(res => {
            if (res) {
                console.log("dimu");
                console.log(this.props.data.counts);
                this.setState({
                    // counts: this.props.data.counts,
                    acceptedCount: this.props.data.counts.acceptedCount,
                    pendingCount: this.props.data.counts.pendingCount,
                    rejectedCount: this.props.data.counts.rejectedCount,
                    completedCount: this.props.data.counts.completedCount,
                    isFetching: false
                });
            }
        })
    };

    onLoadAllArticals = () => {
        accepted = 0;
        pending = 0;
        rejected = 0;
        completed = 0;
        this.props.allAritcalFeed(res => {
            if (res) {
              console.log('dimma baby');
              console.log(this.props.data);
              console.log('dimma baby');
                this.setState({
                    data: this.props.data.rtiRequests,
                    isFetching: false
                })
                setTimeout(() => {
                    this.setState({
                        acceptedCount: this.props.data.counts.acceptedCount,
                        pendingCount: this.props.data.counts.pendingCount,
                        rejectedCount: this.props.data.counts.rejectedCount,
                        completedCount: this.props.data.counts.completedCount,
                    })
                }, 1000);
            }
        })
    }

    onRefresh() {
        this.setState({ isFetching: true }, function () {
            this.onLoadAllArticals();
            // this.onLoadCount();
        });
    }


    renderStatusCard = ({ item }) => {
        if (item.rti_status == 1) {
            pending = pending + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.pending} />
                                <Text style={{ color: Colors.orange, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center'}}>{i18n.t('Pending')} </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }else if (item.rti_status == 3) {
            pending = pending + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.pending} />
                                <Text style={{ color: Colors.orange, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>{i18n.t('Accepted with Payment')}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }  else if (item.rti_status == 10) {
            pending = pending + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.pending} />
                                <Text style={{ color: Colors.orange, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>{i18n.t('Accepted Partial with Payment')}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }  else if (item.rti_status == 2) {
            accepted = accepted + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.accepted} />
                                <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>{i18n.t('Accepted')}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }  else if (item.rti_status == 9) {
            accepted = accepted + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.accepted} />
                                <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>{i18n.t('Accepted Partial')}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }  else if (item.rti_status == 4) {
            accepted = accepted + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.accepted} />
                                <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>{i18n.t('Asking Time')}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }  else if (item.rti_status == 7) {
            accepted = accepted + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.accepted} />
                                <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>{i18n.t('Payment Doc Accepted')}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }  else if (item.rti_status == 13) {
            accepted = accepted + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.accepted} />
                                <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>Support Officer Assign</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }  else if (item.rti_status == 14) {
            accepted = accepted + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.accepted} />
                                <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>Support Officer Provide</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }  else if (item.rti_status == 15) {
            accepted = accepted + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.accepted} />
                                <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>Support Officer Accepted</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else if (item.rti_status == 5) {
            rejected = rejected + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.rejected} />
                                <Text style={{ color: Colors.red, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>{i18n.t('Rejected')}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else if (item.rti_status == 8) {
            rejected = rejected + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.rejected} />
                                <Text style={{ color: Colors.red, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>{i18n.t('Payment Doc Rejected')}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else if (item.rti_status == 16) {
            rejected = rejected + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.rejected} />
                                <Text style={{ color: Colors.red, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>Support Officer Rejected</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else if (item.rti_status == 6) {
            completed = completed + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.completed} />
                                <Text style={{ color: Colors.green, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>{i18n.t('Completed')}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else if (item.rti_status == 11) {
            completed = completed + 1;
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[styles.itemCardOuter]}>
                        <View style={[styles.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.completed} />
                                <Text style={{ color: Colors.green, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>Closed</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        const { data, loading } = this.props;
        return (
            <View style={[Main.screen.container]}>
                <View style={[Main.screen.screenTitleSection]}>
                    <Text style={[{ color: Colors.white, fontFamily: 'roboto-medium' }]}>{i18n.t('Welcome to')} </Text>
                    <Text style={[Main.screen.screenTitle]}>RTI Tracking System</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.statusSection]}>
                    <View style={[styles.statusCardOuter]}>
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('AcceptedScreen')
                            }}
                        >
                            <View style={[styles.statusCard, { backgroundColor: Colors.transblue }]}>
                                <Image source={Images.accepted} style={{ width: 50, height: 50, marginBottom: 5 }} />
                                <Text style={[{ color: Colors.blue, fontFamily: 'roboto-bold', fontSize: 25 }]}>{this.state.acceptedCount}</Text>
                                <Text style={[{ color: Colors.blue, fontFamily: 'roboto-bold' }]}>{i18n.t('ACCEPTED')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.statusCardOuter]}>
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('PendingScreen')
                            }}
                        >
                            <View style={[styles.statusCard, { backgroundColor: Colors.transorange }]}>
                                <Image source={Images.pending} style={{ width: 50, height: 50, marginBottom: 5 }} />
                                <Text style={[{ color: Colors.orange, fontFamily: 'roboto-bold', fontSize: 25 }]}>{this.state.pendingCount}</Text>
                                <Text style={[{ color: Colors.orange, fontFamily: 'roboto-bold' }]}>{i18n.t('PENDING')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.statusCardOuter]}>
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('CompletedScreen')
                            }}
                        >
                            <View style={[styles.statusCard, { backgroundColor: Colors.transgreen }]}>
                                <Image source={Images.completed} style={{ width: 50, height: 50, marginBottom: 5 }} />
                                <Text style={[{ color: Colors.green, fontFamily: 'roboto-bold', fontSize: 25 }]}>{this.state.completedCount}</Text>
                                <Text style={[{ color: Colors.green, fontFamily: 'roboto-bold' }]}>{i18n.t('COMPLETED')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.statusCardOuter]}>
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('RejectedScreen')
                            }}
                        >
                            <View style={[styles.statusCard, { backgroundColor: Colors.transred }]}>
                                <Image source={Images.rejected} style={{ width: 50, height: 50, marginBottom: 5 }} />
                                <Text style={[{ color: Colors.red, fontFamily: 'roboto-bold', fontSize: 25 }]}>{this.state.rejectedCount}</Text>
                                <Text style={[{ color: Colors.red, fontFamily: 'roboto-bold' }]}>{i18n.t('REJECTED')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <View style={styles.listContent}>
                    {loading ?
                        <ActivityIndicator size="small" color={Colors.ash} style={{ top: HP(10) }} />
                        :
                        <FlatList
                            data={this.state.data}
                            ListEmptyComponent={() => (
                                <View style={ {height: HP(50)}, Main.centerView}>
                                    <Image source={Images.empty} style={Main.emptylogo}></Image>
                                    <Text style={{color: Colors.ash}}>You do not have any RTI requests</Text>
                                </View>
                            )}
                            renderItem={this.renderStatusCard}
                            keyExtractor={(item, index) => item.rti_id.toString()}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isFetching}
                                    onRefresh={this.onRefresh.bind(this)}
                                    title="Pull to refresh"
                                    tintColor="#707070"
                                    titleColor="#707070"
                                />
                            }
                            extraData={this.state.data}
                        />
                    }
                </View>
            </View >
        )
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.allArticalsDataReducer.loading,
        data: state.allArticalsDataReducer.data,
        error: state.allArticalsDataReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(
    mapStateToProps,
    // mapStateToPropsCount,
    mapDispatchToProps,
)(HomeScreen);
