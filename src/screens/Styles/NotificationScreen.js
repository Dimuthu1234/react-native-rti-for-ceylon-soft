import { StyleSheet } from 'react-native';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../theme'

export default StyleSheet.create({
    emptyConteiner: {
        height: HP(80),
        justifyContent: 'center',
        alignItems: 'center'
    },
    curcileView: {
        height: WP(40),
        width: WP(40),
        borderRadius: WP(20),
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.transash,
        backgroundColor: Colors.white
    },
    emptyTitle: {
        marginVertical: HP(2.5),
        fontFamily: 'roboto-medium',
        fontSize: RF(2),
        color: Colors.ash
    },
    itemCardOuter: {
        width: WP(100),
        padding: WP(2),
    },
    itemCard: {
        backgroundColor: Colors.white,
        borderRadius: WP(1),
        paddingHorizontal: WP(3),
        paddingVertical: WP(4),
        flexDirection: 'row'
    },
});