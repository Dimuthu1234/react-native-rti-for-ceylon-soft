import { StyleSheet } from 'react-native';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../theme';
export default StyleSheet.create({
    itemGap: {
        marginBottom: HP(2)
    },
    wrapDropDownHeader: {
        marginHorizontal: WP(2),
        padding: WP(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: WP(1),
    },
    contentView: {
        alignItems: 'center',
        marginHorizontal: WP(2),
        padding: WP(3.5),
        top: -HP(2),
        borderTopWidth: 1,
        borderTopColor: Colors.ash,
        backgroundColor: Colors.white,
        borderRadius: WP(1),
    },
    contetText: {
        color: Colors.ash,
        fontFamily: 'roboto-regular',
        fontSize: RF(2),
        marginBottom: HP(2),
    },
    moreInfoTitle: {
        fontSize: RF(2),
        marginBottom: HP(1),
        color: Colors.black,
        fontFamily: 'roboto-bold'
    },
    moreInfo: {
        // fontSize: RF(1),
        color: Colors.ash,
        fontFamily: 'roboto-regular',
        marginRight: HP(2),
    },
    dropIcon: {
        fontSize: RF(2)
    },
    buttonStyle: {
        backgroundColor: Colors.blue
    },
    buttonStyleView: {
        width: WP(70),
        marginBottom: HP(2),
    },
    contentWrapper: {
        marginBottom: HP(2),
    }
});