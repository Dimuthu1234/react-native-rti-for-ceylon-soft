
import React, { Component } from 'react';
import {View, Text, ActivityIndicator, Image, RefreshControl} from "react-native";
import RadioButton from 'react-native-radio-button';
import { Images, ApplicationStyles as Main, Colors } from '../theme';
import { Button, SearchBar } from 'react-native-elements';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import NavigationService from '../services/navigation';
import styles from './Styles/SearchScreen';
import stylez from './Styles/HomeScreen';

import {ScrollView, FlatList, TouchableWithoutFeedback, TouchableOpacity} from 'react-native-gesture-handler';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions
import i18n from 'i18n-js';
import {Feather} from "@expo/vector-icons";


class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            valueId: '',
            isValid: false,
            isLoading: false,
            data: [],
        };
        this.arrayholder = [];

    }

    componentDidMount() {
        // this.loadOrgList()
        this.onLoadAllArticals()
    }







    updateSearch = text => {
        this.setState({
            value: text,
        });
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.rti_title.toUpperCase()}`;

            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.setState({ data: newData });
    };

    updateSearchByRTIID = text => {
        this.setState({
            valueId: text,
        });
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.rti_id}`;

            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.setState({ data: newData });
    };


    onLoadAllArticals = () => {
        this.props.allAritcalFeed(res => {
            if (res) {
                this.setState({
                    data: this.props.data.rtiRequests,
                })
                this.arrayholder = this.props.data.rtiRequests;
            }
        })
    }

    renderStatusCard = ({ item, index }) => {
        if (item.rti_status == 1) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.pending} />
                                <Text style={{ color: Colors.orange, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center'}}>{i18n.t('Pending')}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }else if (item.rti_status == 3) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
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
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.pending} />
                                <Text style={{ color: Colors.orange, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>{i18n.t('Accepted Partial with Payment')} </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }  else if (item.rti_status == 2) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
                            <View style={{ flex: 4 }}>
                                <Text style={{ fontFamily: 'roboto-bold', fontSize: 16, color: Colors.black }}>{item.rti_title}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{item.created_at}</Text>
                                <Text style={{ fontFamily: 'roboto-regular', color: Colors.ash, marginTop: 5, }}>{'Reg no : ' + item.rti_id}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.accepted} />
                                <Text style={{ color: Colors.blue, marginTop: 5, fontFamily: 'roboto-medium', textAlign:'center' }}>Accepted</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }  else if (item.rti_status == 9) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
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
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
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
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
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
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
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
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
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
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
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
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
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
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
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
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
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
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
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
            return (
                <TouchableOpacity
                    onPress={() => {
                        NavigationService.navigate('RequestInformationScreen', { pendingData: item })
                    }}
                >
                    <View style={[stylez.itemCardOuter]}>
                        <View style={[stylez.itemCard, Main.shadow]}>
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


    renderItem = ({ item, index }) => (
        <TouchableWithoutFeedback
            onPress={() => { this.onListItem(index, item.rti_id) }}
            style={{ marginVertical: HP(1) }}
        >
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                </View>
                <View style={{ flex: 5, justifyContent: 'center' }}>
                    <Text style={{ color: Colors.black }}>{item.rti_title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

    onListItem = (index, rti_id) => {
        global.RTIRequest.rti_id = rti_id;
        this.setState({ selectedIndex: index, isValid: true });
    }

    /**
     * redux functions
     */

    // loadOrgList = () => {
    //     this.props.loadOrgList(res => {
    //         if (res) {
    //             this.setState({
    //                 data: this.props.data.data
    //             })
    //             this.arrayholder = this.props.data.data;
    //         }
    //     })
    // }

    render() {

        const { search } = this.state;
        const { data, loading } = this.props;

        return (
            <View style={[Main.screen.container]}>
                <View style={[Main.screen.screenTitleSection]}>
                    <Text style={[Main.screen.screenTitle]}>{i18n.t('Search RTI Requests')} </Text>
                </View>

                <View style={[styles.cardOuter]}>
                    <View style={[Main.shadow, styles.cardStyle]}>
                        <Text style={[styles.title]}>Requests</Text>

                        <SearchBar
                            placeholder="Search by Title"
                            placeholderTextColor={Colors.ash}
                            containerStyle={[styles.containerStyle]}
                            inputContainerStyle={[styles.inputContainerStyle]}
                            clearIcon={{ size: RF(3) }}
                            searchIcon={{ size: RF(3) }}
                            onChangeText={(text) => this.updateSearch(text)}
                            value={this.state.value}
                        />

                        <SearchBar
                            placeholder="Search by RTI ID"
                            placeholderTextColor={Colors.ash}
                            containerStyle={[styles.containerStyle]}
                            inputContainerStyle={[styles.inputContainerStyle]}
                            clearIcon={{ size: RF(3) }}
                            searchIcon={{ size: RF(3) }}
                            onChangeText={(text) => this.updateSearchByRTIID(text)}
                            value={this.state.valueId}
                        />
                        <View style={[styles.barStyle]}></View>

                    </View>
                </View>
                <View style={{ height: HP(60) }}>
                    <FlatList
                        data={this.state.data}
                        ListEmptyComponent={() => (
                            <View style={{height: HP(50)}, Main.centerView}>
                                <Image source={Images.empty} style={Main.emptylogo}></Image>
                                <Text style={{color: Colors.ash}}>You do not have any RTI requests</Text>
                            </View>
                        )}
                        renderItem={this.renderStatusCard}
                        keyExtractor={(item, index) => item.rti_id.toString()}
                        extraData={this.state.data}
                    />
                </View>
            </View>
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
    mapDispatchToProps,
)(SearchScreen);
