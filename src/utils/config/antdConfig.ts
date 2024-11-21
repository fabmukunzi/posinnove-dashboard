import { theme, ThemeConfig } from 'antd';

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#091e6a',
    colorText: 'rgb(26,32,26)',
    colorError: '#ff7875',
    fontWeightStrong: 10,
    fontFamilyCode: 'Poppins',
    colorLink: 'black',
    colorLinkHover: '#091e6a',
    colorLinkActive: '#091e6a',
  },
  components: {
    Button: {
      defaultBg: '#091e6a',
      controlHeight: 40,
      colorText: 'white',
      primaryShadow: 'none',
    },
    Input: {
      lineHeight: 2.5,
      colorBorder: '#091e6a',
    },
    Menu: {
      lineHeight: 1,
      itemHoverBg:"black",
      itemHoverColor:"#091e6a",
      itemSelectedBg:"black"
    },
    Card: {
      colorBorder: '#091e6a',
    },
    Carousel:{
      dotActiveWidth:12,
      dotHeight:12,
      dotWidth:12,
      dotOffset:12,
      dotGap:2
    },
    Tabs:{
      titleFontSize:16,
      horizontalMargin:"0 0 18px 0"
    },
  },
};

export default antdTheme;
