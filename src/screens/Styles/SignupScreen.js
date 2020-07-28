import {StyleSheet} from 'react-native';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
  } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
    logo: {
      width: WP(30),
      height: HP(20),
      resizeMode: 'contain'
    },
    inputStyle: {
      fontFamily: 'roboto-regular'
    },
    inputContainer: {
      width: WP(75),
      marginBottom: HP(2) 
    }
  });