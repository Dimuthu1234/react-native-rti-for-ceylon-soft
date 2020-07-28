
import React, { Component } from 'react';
import {View, Text, ActivityIndicator, Image, RefreshControl} from "react-native";
import { Images, ApplicationStyles as Main, Colors } from '../theme';
import AccordionItem from '../components/accordinListItem';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';


// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import NavigationService from "../services/navigation";
import styles from "./Styles/RegisterScreen"; //Import your actions
import i18n from 'i18n-js';


class AcceptedScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            data: []
        };
    }

    componentDidMount() {
        this.loadAccepted()
    }

    loadAccepted = () => {
        this.props.allRequestFeed(res => {
            this.setState({
                isLoading: true,
                data: this.props.data.data
            })
        })
    };

    renderCardItem = ({ item }) => (
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
                        {item.rti_status == 2 ? <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign: 'center' }}>{i18n.t('Accepted')}</Text>
                        :item.rti_status == 4 ? <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign: 'center' }}>{i18n.t('Asking Time')}</Text>
                        :item.rti_status == 7 ? <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign: 'center' }}>{i18n.t('Payment Doc Accepted')}</Text>
                        :item.rti_status == 9 ? <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign: 'center' }}>{i18n.t('Accepted Partial')}</Text>
                        :item.rti_status == 13 ? <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign: 'center' }}>Support Officer Assign</Text>
                        :item.rti_status == 14 ? <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign: 'center' }}>Support Officer Provide</Text>
                        :item.rti_status == 15 ? <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign: 'center' }}>Support Officer Accept</Text>
                        :null
                    }
                        {/* <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium' }}>Accepted</Text> */}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );


    render() {
        const { data, loading } = this.props;
        return (
            <View style={[Main.screen.container]}>
                <View style={[Main.screen.screenTitleSection]}>
                    <Text style={[Main.screen.screenTitle]}>{i18n.t('Accepted RTI Requests')}</Text>
                </View>
                {loading ?
                    <ActivityIndicator size="small" color={Colors.ash} style={{ top: HP(30) }} />
                    :
                    <FlatList
                        data={this.state.data}
                        ListEmptyComponent={() => (
                            <View style={{ height: HP(50) }, Main.centerView}>
                                <Image source={Images.empty} style={Main.emptylogo}></Image>
                                <Text style={{ color: Colors.ash }}>You do not have any RTI requests</Text>
                            </View>
                        )}
                        renderItem={this.renderCardItem}
                        keyExtractor={(item, index) => item.rti_id.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isFetching}
                                // onRefresh={this.onRefresh.bind(this)}
                                title="Pull to refresh"
                                tintColor="#707070"
                                titleColor="#707070"
                            />
                        }
                        extraData={this.state.data}
                    />
                }
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.acceptedDataReducer.loading,
        data: state.acceptedDataReducer.data,
        error: state.acceptedDataReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AcceptedScreen);