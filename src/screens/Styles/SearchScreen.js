import { StyleSheet } from 'react-native';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../theme';

export default StyleSheet.create({
    cardOuter: {
        // width: WP(100),
        padding: WP(2),
        paddingHorizontal: WP(2),
    },
    cardStyle: {
        paddingVertical: WP(4),
        paddingHorizontal: WP(3),
        borderRadius: WP(1),
        backgroundColor: Colors.offwhite,
        height: 'auto'
    },
    placeholderTextColor: {
        color: Colors.ash
    },
    containerStyle: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginBottom: HP(1)
    },
    inputContainerStyle: {
        backgroundColor: Colors.white,
        borderColor: Colors.ash,
        borderWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 0,
    },
    title: {
        fontFamily: 'roboto-bold',
        fontSize: RF(2),
        color: Colors.black,
    },
    barStyle: {
        borderBottomWidth: 1,
        borderColor: Colors.transash,
        marginBottom: HP(1),
    },
    listSection: {
        height: HP(47)
    }

});