
import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from "react-native";
import RadioButton from 'react-native-radio-button';
import { Images, ApplicationStyles as Main, Colors } from '../theme';
import { Button, SearchBar } from 'react-native-elements';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import NavigationService from '../services/navigation';
import styles from './Styles/ApplyScreen';
import { ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions
import i18n from 'i18n-js';


class ApplyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isValid: false,
            isLoading: false,
            data: []
        };
        this.arrayholder = [];
    }

    componentDidMount() {
        this.loadOrgList()
    }

    updateSearch = text => {
        this.setState({
            value: text,
        });
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.org_name.toUpperCase()}`;

            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.setState({ data: newData });
    };

    onContinue() {
        this.setState({
            isLoading: true
        })
        NavigationService.navigate('InformationScreen');
        console.log('click countinue')
    }

    renderItem = ({ item, index }) => (
        <TouchableWithoutFeedback
            onPress={() => { this.onListItem(index, item.org_name) }}
            style={{ marginVertical: HP(1) }}
        >
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <RadioButton
                        innerColor={Colors.blue}
                        outerColor={this.state.selectedIndex === index ? Colors.offblue : Colors.transash}
                        animation={'bounceIn'}
                        isSelected={this.state.selectedIndex === index}
                    // onPress={() => { this.onListItem(index) }}
                    />
                </View>
                <View style={{ flex: 5, justifyContent: 'center' }}>
                    <Text style={{ color: Colors.black }}>{item.org_name}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

    onListItem = (index, rti_org) => {
        global.RTIRequest.rti_org_id = rti_org;
        this.setState({ selectedIndex: index, isValid: true });
    }

    /**
     * redux functions
     */

    loadOrgList = () => {
        this.props.loadOrgList(res => {
            if (res) {
                this.setState({
                    data: this.props.data.data
                })
                this.arrayholder = this.props.data.data;
            }
        })
    }

    render() {

        const { search } = this.state;
        const { data, loading } = this.props;

        return (
            <View style={[Main.screen.container]}>
                <View style={[Main.screen.screenTitleSection]}>
                    <Text style={[Main.screen.screenTitle]}>{i18n.t('New RTI Request')}</Text>
                </View>

                <View style={[styles.cardOuter]}>
                    <View style={[Main.shadow, styles.cardStyle]}>
                        <Text style={[styles.title]}>{i18n.t('Organization')}</Text>

                        <SearchBar
                            placeholder="Type Here..."
                            placeholderTextColor={Colors.ash}
                            containerStyle={[styles.containerStyle]}
                            inputContainerStyle={[styles.inputContainerStyle]}
                            clearIcon={{ size: RF(3) }}
                            searchIcon={{ size: RF(3) }}
                            onChangeText={(text) => this.updateSearch(text)}
                            value={this.state.value}
                        />

                        <View style={[styles.barStyle]}></View>

                        <FlatList
                            contentContainerStyle={[styles.listSection]}
                            data={this.state.data}
                            renderItem={this.renderItem}
                            ListEmptyComponent={() => (
                                <ActivityIndicator size="small" color={Colors.ash} style={{top: HP(30)}} />
                            )}
                            keyExtractor={(item, index) => item.org_id.toString()}
                        />
                        <View style={[Main.centerView]}>
                            <Button
                                title="CONTINUE"
                                disabled={!this.state.isValid}
                                buttonStyle={[Main.button.highLightButton]}
                                containerStyle={{ width: WP(80), marginVertical: HP(2) }}
                                titleStyle={{ fontFamily: 'roboto-medium' }}
                                // loading={this.state.isLoading}
                                onPress={() => {
                                    this.onContinue()
                                }}
                            />
                        </View>

                    </View>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.orgListDataReducer.loading,
        data: state.orgListDataReducer.data,
        error: state.orgListDataReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApplyScreen);