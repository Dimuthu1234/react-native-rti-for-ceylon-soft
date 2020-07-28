import {StyleSheet} from 'react-native';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
  } from 'react-native-responsive-dimensions';
import {Colors} from "../../theme";

export default StyleSheet.create({
    titleStyle: {
      fontSize: RF(2),
      fontFamily: 'roboto-bold',
      // paddingBottom: HP(1)
    },
    descriptionStyle: {
      fontSize: RF(2.5),
      fontFamily: 'roboto-regular',
      paddingBottom: HP(1)
    },
    pointContainer: {
        paddingHorizontal: HP(2),
        paddingVertical: HP(2)
    },
    formTitle: {
        fontSize: RF(2),
        fontFamily: 'roboto-regular',
        color: Colors.ash,
        marginBottom: HP(0),
        textAlign:'left',
        marginTop:5
    },
    formSection: {
        marginTop: HP(2),
        // marginBottom: HP(1),
    },

    formSection2: {
        marginTop: HP(2),
        width:300,
        // marginBottom: HP(1),
    },
    placeholderTextColor: {
        color: Colors.red
    },
    inputStyle: {
        fontFamily: 'roboto-regular',
    },
    inputContainer: {
        width: WP(85),
        // marginBottom: HP(2),
        marginTop: HP(2)
    },
  });