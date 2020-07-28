import { StyleSheet } from 'react-native';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../theme'

export default StyleSheet.create({
    formTitle: {
        fontSize: RF(3),
        fontFamily: 'roboto-medium',
        color: Colors.ash,
        marginBottom: HP(2),
    },
    formTitle2: {
        fontSize: RF(2),
        fontFamily: 'roboto-medium',
        color: Colors.ash,
        marginBottom: HP(2),
        textAlign:'center'
    },
    switchTitle: {
        fontSize: RF(1.8),
        fontFamily: 'roboto-regular',
        color: Colors.ash,
        marginBottom: HP(1),
    },
    barBorder: {
        borderBottomWidth: 1,
        borderColor: Colors.transash,
        marginBottom: HP(2)
    }
});