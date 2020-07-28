
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image } from "react-native";
import { Images, ApplicationStyles as Main, Colors } from '../theme';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import styles from './Styles/KnowladgeScreen';
import { SearchBar } from 'react-native-elements';
import AccordionItem from '../components/accordinListItem';
import { FlatList } from 'react-native-gesture-handler';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions
import i18n from 'i18n-js';


class Knowladge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: []
        };
        this.arrayholder = [];
    }

    componentDidMount() {
        this.onloadArticals()
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

    onloadArticals = () => {
        this.props.loadArticles(res => {
            if (res) {
                this.setState({
                    data: this.props.data.data
                })
                this.arrayholder = this.props.data.data;
            }
        })
    }

    render() {
        const { data, loading } = this.props;


        return (
            <View style={[Main.screen.container]}>
                <View style={[Main.screen.screenTitleSection]}>
                    <Text style={[Main.screen.screenTitle]}>{i18n.t('Knowledge Base')}</Text>
                </View>

                {/* search seaction */}

                <View>
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
                </View>
                {loading ?
                    <ActivityIndicator size="small" color={Colors.ash} style={{ top: HP(30) }} />
                    :
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <AccordionItem title={item.rti_title} date={item.created_at} reg={item.rti_id} content={item.rti_description} />
                        )}
                        ListEmptyComponent={() => (
                            <View style={ {height: HP(50)}, Main.centerView}>
                                <Image source={Images.empty} style={Main.emptylogo}></Image>
                                <Text style={{color: Colors.ash}}>You do not have any Knowledge Base</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => item.rti_id.toString()}
                    />
                }

            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.articalsDataReducer.loading,
        data: state.articalsDataReducer.data,
        error: state.articalsDataReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Knowladge);