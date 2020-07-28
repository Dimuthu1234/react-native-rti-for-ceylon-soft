import {StyleSheet} from 'react-native';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
  } from 'react-native-responsive-dimensions';
import { Colors } from '../../theme';

export default StyleSheet.create({
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
  });