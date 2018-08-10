import { createMuiTheme } from "material-ui/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4a148c",
      light: "#7c43bd",
      dark: "#12005e"
    },
    secondary: {
      main: "#6200ea",
      light: "#9d46ff",
      dark: "#0a00b6"
    },
    error: {
      main: "#d44d23"
    },
    text:{
      main:'#ffffff'
    }
  },
  spacing:{
    unit:8
  }
});

export const formTheme = {
  palette: {
    primary: {
      main: "#03A9F4"
    },
    secondary: "#333"
  },
  error: {
    main: "#d44d23"
  }
};
