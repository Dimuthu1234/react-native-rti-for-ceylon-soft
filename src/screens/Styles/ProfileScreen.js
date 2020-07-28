import {StyleSheet} from 'react-native';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
  } from 'react-native-responsive-dimensions';
import { Colors } from '../../theme';

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
    },
    profileImageSection: {
      height: HP(23),
      top: -HP(3),
      backgroundColor: Colors.blue,
      alignItems: 'center',
    },

    drawerImageSection: {
      height: HP(23),
      top: -HP(3),
      backgroundColor: Colors.blue,
      alignItems: 'center',
    },
    profileImageView: {
      // top: HP(3),
      height: HP(16),
      width: HP(16),
      backgroundColor: Colors.black,
      borderColor: Colors.ash,
      borderWidth: 5,
      borderRadius: HP(8),
      marginBottom: HP(1.5)
    },
    profileTitle: {
      color: Colors.white,
      fontSize: RF(2.8),
      textTransform: 'capitalize',
      fontFamily: 'roboto-bold'
    },
    fromTop: {
      top: HP(1)
    }
  });