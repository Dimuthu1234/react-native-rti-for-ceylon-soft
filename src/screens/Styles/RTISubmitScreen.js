import { StyleSheet } from 'react-native';
import {
  responsiveHeight as HP,
  responsiveWidth as WP,
  responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../theme';

export default StyleSheet.create({
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
  title: {
    fontFamily: 'roboto-bold',
    fontSize: RF(2),
    color: Colors.black,
  },
  inputStyle: {
    fontFamily: 'roboto-regular'
  },
  inputContainer: {
    width: WP(85),
    // marginBottom: HP(2),
    marginTop: HP(2)
  },
  scrollContainer: {
    height: HP(60)
  },
  formSection: {
    marginTop: HP(2),
    // marginBottom: HP(1),
  },
  formTitle: {
    fontSize: RF(2),
    fontFamily: 'roboto-regular',
    color: Colors.ash,
    marginBottom: HP(1),
  },
  switchTitile: {
    fontSize: RF(1.8),
    fontFamily: 'roboto-medium',
    color: Colors.ash,
    marginBottom: HP(1),
  },
  formSubTitle: {
    fontSize: RF(1.8),
    fontFamily: 'roboto-regular',
    color: Colors.ash,
    marginBottom: HP(1),
  },
  borderView: {
    borderWidth: 1,
    borderColor: Colors.black,
    padding: WP(4),
    margin: WP(2)
  },
  someTestView: {
    borderColor: Colors.black,
    padding: WP(4),
    margin: WP(2)
  },
  borderViewText: {
    color: 'rgba(0,0,0,0.4)',
    fontFamily: 'roboto-regular',
    // fontSize: RF()
  },
  selectorView: {
    backgroundColor: '#F6F6F6',
    padding: WP(4),
    margin: WP(2)
  },
  modalStyle: {
    width: WP(70),
    borderRadius: WP(1),
    backgroundColor: Colors.white,
    padding: HP(2),
  },
  pointsmodalStyle: {
    width: WP(90),
    borderRadius: WP(1),
    backgroundColor: Colors.white,
    padding: HP(2),
  },
  modalTitle: {
    fontSize: RF(3.5),
    color: Colors.black,
    textAlign: 'center',
    fontFamily: 'roboto-medium',
    marginVertical: HP(1)
  },
  refnoStyle: {
    fontFamily: 'roboto-regular',
    fontSize: RF(2.5),
    color: Colors.ash,
    marginVertical: HP(2)
  }
});
