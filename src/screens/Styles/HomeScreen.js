import {StyleSheet} from 'react-native';
import {
    responsiveHeight as HP,
    responsiveWidth as WP,
    responsiveFontSize as RF,
  } from 'react-native-responsive-dimensions';
  import {
    heightPercentageToDP as hpstyle,
    widthPercentageToDP as wpstyle,
   } from 'react-native-responsive-screen'
  import { Colors } from '../../theme';

  export default StyleSheet.create({
    icons: {
      width: wpstyle('10%'),
      height: wpstyle('10%'),
    },
    statusSection: {
      height: hpstyle('25%'),
      paddingBottom: hpstyle('1%')
    },
    statusCardOuter: {
      width: wpstyle('28%'), 
      paddingLeft: wpstyle('2%'),
      // paddingBottom: HP(1)
    },
    statusCard: {
      height: hpstyle('26%'),
      alignItems: 'center', 
      justifyContent: 'center',
      borderRadius: wpstyle('1%'),
      padding: wpstyle('2%'),
    },
    readSection: {
      flexDirection: 'row',
      paddingHorizontal: wpstyle('2%'),
      marginVertical: hpstyle('1%')
    },
    itemCardOuter: {
      // width: WP(100),
      padding: wpstyle('2%'),
    },

    itemCardOuterDrawer: {
      width: wpstyle('100%'),
      padding: wpstyle('2%'),
    },
    itemCard: {
      backgroundColor: Colors.white,
      borderRadius: wpstyle('1%'),
      paddingHorizontal: wpstyle('3%'),
      paddingVertical: wpstyle('4%'),
      flexDirection: 'row'
    },

    itemCardDrawer: {
        borderRadius: 2,
        paddingHorizontal: wpstyle('3%'),
        paddingVertical: wpstyle('4%'),
        flexDirection: 'row',
        backgroundColor: '#1B89BC',
        textAlign: 'center',
        color: '#FFFFFF',
        textShadowColor: '#585858',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 10,
    },
    statusOuter: {
      width: wpstyle('35%'),
      height: hpstyle('10%')
    },
    listContent: {
      height: hpstyle('50%')
    }
  });





// export default StyleSheet.create({
//     icons: {
//       width: WP(10),
//       height: WP(10),
//     },
//     statusSection: {
//       height: HP(25),
//       paddingBottom: HP(1)
//     },
//     statusCardOuter: {
//       width: WP(33),
//       paddingLeft: WP(2),
//       // paddingBottom: HP(1)
//     },
//     statusCard: {
//       height: HP(18),
//       alignItems: 'center', 
//       justifyContent: 'center',
//       borderRadius: WP(1),
//       padding: WP(2),
//     },
//     readSection: {
//       flexDirection: 'row',
//       paddingHorizontal: WP(2),
//       marginVertical: HP(1)
//     },
//     itemCardOuter: {
//       // width: WP(100),
//       padding: WP(2),
//     },

//     itemCardOuterDrawer: {
//       width: WP(100),
//       padding: WP(2),
//     },
//     itemCard: {
//       backgroundColor: Colors.white,
//       borderRadius: WP(1),
//       paddingHorizontal: WP(3),
//       paddingVertical: WP(4),
//       flexDirection: 'row'
//     },

//     itemCardDrawer: {
//         borderRadius: 2,
//         paddingHorizontal: WP(3),
//         paddingVertical: WP(4),
//         flexDirection: 'row',
//         backgroundColor: '#1B89BC',
//         textAlign: 'center',
//         color: '#FFFFFF',
//         textShadowColor: '#585858',
//         textShadowOffset: {width: 5, height: 5},
//         textShadowRadius: 10,
//     },
//     statusOuter: {
//       width: WP(35),
//       height: HP(10)
//     },
//     listContent: {
//       height: HP(50)
//     }
//   });