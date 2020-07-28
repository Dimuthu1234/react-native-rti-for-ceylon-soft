import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Accordion from 'react-native-collapsible-accordion';
import { AntDesign } from '@expo/vector-icons';
import HTML from 'react-native-render-html';
import { Images, ApplicationStyles as Main } from '../theme';
import styles from './Styles/accordinListItem';


export default class AccordionItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showMoreInfo: false,
            isLoading: false
        }
    }


    render() {
        return (
            <Accordion
                onChangeVisibility={(value) => {
                    this.setState({ showMoreInfo: value })
                }}
                renderHeader={() => (
                    <View style={[Main.shadow, styles.itemGap]}>
                        <View style={[styles.wrapDropDownHeader]}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.moreInfoTitle} numberOfLines={2}>{this.props.title}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.moreInfo}>Date {this.props.date}</Text>
                                    <Text style={styles.moreInfo}>Reg No {this.props.reg}</Text>
                                </View>
                            </View>

                            <AntDesign
                                style={styles.dropIcon}
                                name={!this.state.showMoreInfo ? 'down' : 'up'}
                            />
                        </View>
                    </View>
                )}
                renderContent={() => (
                    <View style={[Main.shadow]}>
                        <View style={styles.contentView}>
                            {/* <Text style={[styles.contetText]}>{this.props.content}</Text> */}
                            <HTML html={this.props.content} imagesMaxWidth={Dimensions.get('window').width} containerStyle={styles.contentWrapper}/>
                            <Button
                                title="DOWNLOAD ATTACMENT(S)"
                                containerStyle={styles.buttonStyleView}
                                buttonStyle={styles.buttonStyle}
                                titleStyle={{ fontFamily: 'roboto-medium' }}
                                loading={this.state.isLoading}
                                onPress={() => {
                                    console.log('downloading')
                                }}
                            />
                        </View>
                    </View>
                )}
            />
        );
    }
}