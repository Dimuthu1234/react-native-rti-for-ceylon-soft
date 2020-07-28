import React, { Component } from 'react';
import { View, Image, StatusBar, AsyncStorage } from 'react-native';
import * as Progress from 'react-native-progress';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import NavigationService from '../services/navigation';
import { Images, ApplicationStyles as Main } from '../theme';
import styles from './Styles/MainLoading';
import { Colors } from '../theme';
import i18n from 'i18n-js';


export default class MainLoading extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            indeterminate: true,
        };
    }

    componentDidMount() {
        console.log('MainLoading')
        this.animate();
        AsyncStorage.clear();
    }

    animate() {
        let progress = 0;
        this.setState({ progress });
        setTimeout(() => {
            this.setState({ indeterminate: false });
            let id = setInterval(() => {
                progress += Math.random() / 2;
                if (progress > 1) {
                    progress = 1;
                }
                this.setState({ progress });
                if(progress>=1){
                    clearInterval(id);
                    NavigationService.navigate('SigninScreen')
                    // NavigationService.navigate('RequestInformationScreen')
                    // NavigationService.navigate('RTISubmitScreen')
                    
                }
            }, 500);
        }, 1500);
    }


    render() {
        return (
            <View style={[Main.centerView, Main.screen.mainContainer]}>
                <StatusBar hidden />
                <Image source={Images.logo} style={styles.logo}></Image>
                <Progress.Bar
                    borderRadius={0}
                    height={HP(1)}
                    width={WP(70)}
                    color={Colors.blue}
                    progress={this.state.progress}
                    indeterminate={this.state.indeterminate}
                />
            </View>
        );
    }
}