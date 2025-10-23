import { lighten, darken } from 'polished';
import config from './config';

const PRIMARY = config.profile.primaryColor;
const SECONDARY = '#ff6350';

const theme = {
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  palette: {
    primary: {
      light: lighten(0.2, PRIMARY),
      main: PRIMARY,
      dark: darken(0.2, PRIMARY),
      contrastText: '#fff',
    },
    secondary: {
      light: lighten(0.2, SECONDARY),
      main: SECONDARY,
      dark: darken(0.2, SECONDARY),
      contrastText: '#fff',
    },
    text: {
      primary: '#5A5F5F',
    },
    footer: '#2e2d35',
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
        border: 0,
        padding: '6px 12px',
        minWidth: '32px',
        minHeight: '32px',
        height: '32px',
        textTransform: 'none',
      },
    },
    MuiCard: {
      root: {
        border: `1px solid #ddd`,
      },
    },
    MuiIconButton: {
      root: {
        width: '32px',
        height: '32px',
        padding: '0px',
      },
    },
    MuiTablePagination: {
      root: {
        height: '36px',
        minHeight: '36px',
      },
      toolbar: {
        height: '36px',
        minHeight: '36px',
      },
    },
    MuiTabs: {
      root: {
        borderBottom: '1px solid #616161',
      },
      indicator: {
        display: 'none',
      },
    },
    Mui: {
      disabled : {
        color : 'black !important'
      }
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        minWidth: '10px !important',
        '&$selected': {
          backgroundColor: PRIMARY,
          color: 'white',
          '&:hover': { backgroundColor: PRIMARY },
        },
        '&:hover': { backgroundColor: lighten(0.3, PRIMARY) },
      },
      textColorInherit: {
        color: 'rgb(52, 137, 202)',
        '&.Mui-disabled': {
          color: '#9e9e9e !important',
        },
      },
    },
    MuiTypography: {
      // colorSecondary: {
      //   color: '#E2DFDF',
      // },
      colorError: {
        color: SECONDARY,
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        padding: 0,
        paddingRight: '32px',
        minHeight: 0,
        '&$expanded': {
          minHeight: 0,
          margin: 0,
        },
      },
      content: {
        width: '100%',
        margin: 0,
        '&$expanded': {
          margin: 0,
        },
      },
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: 0,
        paddingRight: '32px',
      },
    },
    MuiLinearProgress: {
      root: {
        height: '1px',
      },
    },
  },
  zIndex: {
    header: 51002, // Includes: NCILogoBar and NCINavBar
    navbar: 51001, // NavBar
    navPanel: 51000, // NavPanel (on the left side of Profile)
  },

  /*  
    =============================
    HEADER & BANNER HEIGHTS  
    =============================

    - Banner:
        - ReviewBanner:      58px
        - ShutdownBanner:   167px

    - Header (Total: 253px):
        - USABanner:         46px
        - NCILogoBar:       100px
        - NCINavBar:         59px
        - NavBar:            48px
  */
 
  /*  
    =============================
    DRAWER CONFIGURATION  
    =============================  
    - Positioned below ReviewBanner and Header
    - Height dynamically adjusted based on total height
  */
  Drawer: {
    paper: {
      marginTop: '450px', // ReviewBanner (58px) + Header (345px)
      height: 'calc(100% - 450px)',
    },
  },

  /*  
    =============================
    STATIC PAGE CONFIGURATION  
    =============================  
    - Used for pages that do NOT include NavBar (48px)
  */
  staticPage: {
    height: '405px', // ReviewBanner (58px) + USABanner (46px) + NCILogoBar (100px) + NCINavBar (59px)
    spacing: '52px', // Space below the header before main content
    heightNumber: 405, // Numeric height without 'px' for calculations
  },

  /*  
    =============================
    DYNAMIC PAGE CONFIGURATION  
    =============================  
    - Used for pages that include the full header setup
  */
  dynamicPage: {
    header: {
      height: 450, // Includes: ReviewBanner(58), Header(253)
    },
  },
};

export default theme;
