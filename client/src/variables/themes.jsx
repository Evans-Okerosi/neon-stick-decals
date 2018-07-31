import { createMuiTheme } from "material-ui/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#37474f",
      light: "#62727b",
      dark: "#102027"
    },
    secondary: {
      main: "#424242",
      light: "#6d6d6d",
      dark: "#1b1b1b"
    },
    error: {
      main: "#d44d23"
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
