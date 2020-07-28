import {StyleSheet} from 'react-native';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
  } from 'react-native-responsive-dimensions';
  import { Colors } from '../../theme';
export default StyleSheet.create({
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