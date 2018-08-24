import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import { createMuiTheme } from "material-ui/styles";

export const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
  spacing:{
    unit:8
  },
  callToAction:{
    color: red[900]
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
