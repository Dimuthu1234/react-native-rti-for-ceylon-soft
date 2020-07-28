import {
  responsiveHeight as HP,
  responsiveWidth as WP,
  responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';

const type = {
  base_Medium: 'GothamRounded-Medium',
  base_Book: 'GothamRounded-Book',
  base_emphasis: 'GothamRounded-LightItalic',
  cooper_bold: 'Bitstream - Cooper Blk BT Black',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic',
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: WP(3.8),
  small: 12,
  tiny: 8.5,
};

const style = {
  h1: {
    fontFamily: type.base_Medium,
    fontSize: size.h1,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2,
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3,
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
  },
  h4i: {
    fontFamily: type.base_Medium,
    fontSize: size.h4,
    fontStyle: 'italic',
  },
  h5: {
    fontFamily: type.base_Medium,
    fontSize: size.h5,
  },
  h5i: {
    fontFamily: type.base_emphasis,
    fontSize: size.h5,
  },
  h6: {
    fontFamily: type.base_Medium,
    fontSize: size.h6,
  },
  normal: {
    fontFamily: type.base_Medium,
    fontSize: size.medium,
  },
  description: {
    fontFamily: type.base_Book,
    fontSize: size.medium,
  },
};

export default {
  type,
  size,
  style,
};
