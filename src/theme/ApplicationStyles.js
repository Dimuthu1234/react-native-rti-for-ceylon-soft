import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';
import {
  responsiveHeight as HP,
  responsiveWidth as WP,
  responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  button: {
    outlineButton: {
      borderColor: Colors.ash,
    },
    highLightButton: {
      backgroundColor: Colors.blue,
    },

    highLightButton3: {
      backgroundColor: Colors.blue,
      width:300
    },

    highLightButton2: {
      backgroundColor: Colors.red,
    },

    highLightButton4: {
      backgroundColor: Colors.red,
      width:300
    },
  },
  headerIcon: {
    IconStyle: {
      height: 65,
      width: 65,
      resizeMode: 'contain',
    },
  },
  text: {
    normalText: {
      ...Fonts.type.normal,
    },
  },
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.offwhite,
    },
    screenTitleSection: {
      backgroundColor: Colors.blue,
      height: HP(9),
      top: -HP(1.9),
      justifyContent: 'center',
      paddingHorizontal: WP(2),
    },

    screenTitleSectionDrawer: {
      backgroundColor: Colors.blue,
      height: HP(6),
      top: -HP(1.9),
      justifyContent: 'center',
      paddingHorizontal: WP(2),
    },
    screenTitle: {
      fontFamily: 'roboto-medium',
      color: Colors.white,
      fontSize: RF(2.5)
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center',
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin,
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text,
    },
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin,
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow,
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center',
  },
  card: {
    cardPadding: {
      paddingHorizontal: WP(6),
    },
    imageSize: {
      width: '100%',
      resizeMode: 'contain',
    },
    cardOuter: {
      width: WP(100),
      padding: WP(2),
      paddingHorizontal: WP(4),
    },
    cardStyle: {
      paddingVertical: WP(4),
      paddingHorizontal: WP(3),
      borderRadius: WP(1),
      backgroundColor: Colors.white,
    },
    reqcardOuter: {
      width: WP(100),
      paddingBottom: WP(2),
      paddingHorizontal: WP(4),
    },
    reqcardStyle: {
      paddingBottom: WP(4),
      // paddingHorizontal: WP(3),
      borderRadius: WP(1),
      backgroundColor: Colors.white,
    },
    reqcardHeader: {
      backgroundColor: 'rgba(9,127,180,0.1)',
      borderTopLeftRadius: WP(1),
      borderTopRightRadius: WP(1),
      paddingHorizontal: WP(3),
      paddingVertical: WP(3),
      width: '100%'
    }
  },
  lottie: {
    height: 50,
    width: 50,
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerView2: {
    justifyContent: 'left',
    alignItems: 'left',
    flex: 4
  },

  timelineView: {
    backgroundColor: Colors.offwhite,
    padding:30
  },
  test_br: {
    borderColor: 'red',
    borderWidth: 1,
  },
  shadow: {
    shadowColor: "#065FA0",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnBCA:{
    backgroundColor:Colors.green,
    padding:10,
    borderRadius:5
  },

  btnBCAp:{
    backgroundColor:Colors.offblue,
    padding:10,
    borderRadius:5
  },
  btnBCR:{
    backgroundColor:Colors.red,
    padding:10,
    borderRadius:5
  },

  btnBCAMT:{
    backgroundColor:Colors.blue,
    padding:10,
    borderRadius:5
  },

  btnPaymentRequested:{
    backgroundColor:Colors.green,
    padding:10,
    borderRadius:5
  },

  btnPaymentRequestedDisabled:{
    backgroundColor:Colors.ash,
    padding:10,
    borderRadius:5
  },


  emptylogo: {
    height: HP(10),
    width: HP(10)
  }
};

export default ApplicationStyles;
