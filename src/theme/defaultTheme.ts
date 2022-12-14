import { ThemeInterface } from './ThemeInterface'

export const defaultTheme: ThemeInterface = {
  isRTL: false,
  palette: {
    primary: {
      main: 'rgb(66, 133, 244)',
      contrastText: '#fff',
    },
    cellBg: '#EAE9ED',
    nowIndicator: 'red',
    borderColor:'#D1D1D1',
    headingColor:'black',
    backgroundColor:'#EAE9ED',
    cellBackgroundColor:"#FFFFFF",
    gray: {
      // 50: '#fafafa',
      100: '#f5f5f5',
      200: '#D1D1D1',
      300: '#e0e0e0',
      400: '#CCCCCC',
      500: '#9e9e9e',
      // 600: '#757575',
      // 700: '#616161',
      800: '#424242',
      // 900: '#212121',
    },
  },
  eventCellOverlappings: [
    { main: '#E26245', contrastText: '#fff' }, // orange
    { main: '#4AC001', contrastText: '#fff' }, // green
    { main: '#5934C7', contrastText: '#fff' }, // purple
  ],
  typography: {
    xs: {
      fontSize: 10,
    },
    sm: {
      fontSize: 12,
    },
    xl: {
      fontSize: 22,
    },
  },
}
