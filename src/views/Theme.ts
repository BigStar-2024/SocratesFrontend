import { createTheme } from '@mui/material/styles';
import { BasicColor } from 'views/Color';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    yellow: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    yellow?: PaletteOptions['primary'];
    aqua?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    yellow: true;
    aqua: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    error: true;
  }
}

export const settingPage = createTheme({
  palette: {
    primary: {
      main: BasicColor.green,
      contrastText: '#ffffff',
      light: BasicColor.greenShadow,
      dark: BasicColor.greenShadow
    },
    secondary: {
      main: '#919699',
      contrastText: '#ffffff',
    },

  },
  components: {
    MuiTypography: {
      styleOverrides: {

      },
      variants: [
      ]
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: BasicColor.green,
          '& .MuiSvgIcon-root': {
            fontSize: 30,
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 15,
          minWidth: 150,
          maxWidth: 250,
        },
        root: {
          textTransform: 'unset',
        },
        text: {
          color: BasicColor.blue,
          textDecoration: 'underline'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          ':focus': {
            outline: 0,
            border: 0,
          },

          '& fieldset': {
            borderColor: BasicColor.greenSoft,
          },
          ':hover fieldset': {
            borderColor: BasicColor.greenSoft
          },
        },
        input: {
          ':focus :valid': {
            outline: 0,
            border: 0
          },
        },
      }
    },
  }
});

export const themeTeacher = createTheme({
  palette: {
    primary: {
      main: BasicColor.green,
      contrastText: '#ffffff',
      light: BasicColor.greenShadow,
      dark: BasicColor.greenShadow
    },
    yellow: {
      main: BasicColor.yellow,
      light: BasicColor.yellowLight,
      dark: BasicColor.yellowDark,
    },
    secondary: {
      main: BasicColor.blue,
      light: BasicColor.blueLight,
      dark: BasicColor.blueDark,
      contrastText: '#ffffff',
    },
    aqua: {
      main: BasicColor.aqua,
      light: BasicColor.aquaLight,
      contrastText: '#ffffff',
      dark: BasicColor.aquaDark,
    },
    // secondary: {
    //   main: '#919699',
    //   contrastText: '#ffffff',
    // },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 20,
          minWidth: 120,
          maxWidth: 250,
        },
        root: {
          textTransform: 'unset',
          height: 50,
          minWidth: 150,
        },
        text: {
          color: BasicColor.blue,
          textDecoration: 'underline'
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        item: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
    },
    MuiLink: {
      variants: [
        {
          props: { variant: 'body1' },
          style: ({ theme }) => ({
            fontSize: 16,
            [theme.breakpoints.down('sm')]: {
              fontSize: 12,
            },
            color: 'white',
            textAlign: 'center'
          })
        },
      ],
      styleOverrides: {
        root: {
          textDecoration: 'none',
          textAlign: 'center',
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          ':focus': {
            outline: 0,
            border: 0,
          },

          '& fieldset': {
            borderColor: BasicColor.greenSoft,
          },
          ':hover fieldset': {
            borderColor: BasicColor.greenSoft
          },
        },
        input: {
          ':focus :valid': {
            outline: 0,
            border: 0
          },
        },
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: BasicColor.green,
          '& .MuiSvgIcon-root': {
            fontSize: 30,
          },
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'body1' },
          style: ({ theme }) => ({
            fontSize: 24,
            [theme.breakpoints.down('sm')]: {
              fontSize: 12,
            }
          })
        },
        {
          props: { variant: 'h4' },
          style: ({ theme }) => ({
            fontSize: 40,
            [theme.breakpoints.down('sm')]: {
              fontSize: 24,
            },
            fontWeight: 'bold'
          })
        },
      ],
      styleOverrides: {
      }
    },
  }
});

export const welcomePage = createTheme({
  palette: {
    primary: {
      main: BasicColor.green,
      contrastText: '#ffffff',
      light: BasicColor.greenShadow,
      dark: BasicColor.greenShadow
    },
    yellow: {
      main: BasicColor.yellow,
      light: BasicColor.yellowLight,
      dark: BasicColor.yellowDark,
    },
    secondary: {
      main: BasicColor.blue,
      light: BasicColor.blueLight,
      dark: BasicColor.blueDark,
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        item: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'body1' },
          style: ({ theme }) => ({
            fontSize: 24,
            [theme.breakpoints.down('sm')]: {
              fontSize: 12,
            }
          })
        },
        {
          props: { variant: 'h4' },
          style: ({ theme }) => ({
            fontSize: 40,
            [theme.breakpoints.down('sm')]: {
              fontSize: 24,
            }
          })
        },
      ],
      styleOverrides: {
        root: {
          textAlign: 'center',
          color: 'black',
        },
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          ':focus': {
            outline: 0,
            border: 0,
          },
          '& fieldset': {
            borderColor: BasicColor.greenSoft,
          },
          ':hover fieldset': {
            borderColor: BasicColor.greenSoft
          },
        },
        input: {
          ':focus :valid': {
            outline: 0,
            border: 0
          },
        },
      }
    },
    MuiLink: {
      variants: [
        {
          props: { variant: 'body1' },
          style: ({ theme }) => ({
            fontSize: 16,
            [theme.breakpoints.down('sm')]: {
              fontSize: 12,
            },
            color: 'black',
            textAlign: 'center'
          })
        },
      ],
      styleOverrides: {
        root: {
          textDecoration: 'none',
          textAlign: 'center',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          height: 50,
          minWidth: 150,
          textTransform: 'none'
        }
      }
    }
  }
});
