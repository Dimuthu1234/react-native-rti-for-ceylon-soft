
import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, RefreshControl } from "react-native";
import { Images, ApplicationStyles as Main, Colors } from '../theme';
import styles from './Styles/CompletedScreen';

import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import NavigationService from '../services/navigation';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {Btn, Container, Header, Left, Right} from "native-base";
import {Feather} from "@expo/vector-icons";
import i18n from 'i18n-js';


class CompletedScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isFetching: false,
            data: []
        };
    }

    componentDidMount() {
        this.loadCompleted()
    }

    onRefresh() {
        this.setState({ isFetching: true }, function () {
            this.loadCompleted();
        });
    }

    loadCompleted = () => {
        this.props.allCompletedFeed(res => {
            this.setState({
                isLoading: true,
                isFetching: false,
                data: this.props.data.data
            })
        })
    }

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
                        <Image source={Images.completed} />
                        <Text style={{ color: Colors.green, marginTop: 5, fontFamily: 'roboto-medium' }}>{i18n.t('Completed')}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )


    render() {
        const { data, loading } = this.props;
        return (
            <View style={[Main.screen.container]}>
                <View style={[Main.screen.screenTitleSection]}>
                    <Text style={[Main.screen.screenTitle]}>{i18n.t('Completed RTI Requests')}</Text>
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
        )
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.completedDataReducer.loading,
        data: state.completedDataReducer.data,
        error: state.completedDataReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CompletedScreen);