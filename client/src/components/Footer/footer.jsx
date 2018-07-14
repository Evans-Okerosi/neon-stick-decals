import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, withStyles, Grid, Typography } from "material-ui";
import { theme, formTheme} from "variables/themes.jsx";
const styles = {
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: "2em",
    height:'16em'
  },
  container:{
    background:'#333',
    padding:0,
    margin:0,
    color:'#fff'
  }
};
class Footer extends React.Component {
  render() {
    var classes = this.props.classes;
    return (
      <footer className={classes.root}>
        <div className={classes.container} >
          <Grid container alignContent="space-between">
            <Grid item md={4}>
              <Typography type="display1">SKINS?</Typography>
              <List dense>
                <ListItem dense>What are skins?</ListItem>
                <ListItem dense>How to Purchase a skin</ListItem>
                <ListItem dense>How to fix a skin on your device?</ListItem>
              </List>
            </Grid>
            <Grid item md={4}>
              <Typography type="subheading">
                today and tomorrow and tomorrow <br />
                today and tomorrow and tomorrow<br />
                today and tomorrow and tomorrow<br />
                today and tomorrow and tomorrow<br />
                today and tomorrow and tomorrow<br />
              </Typography>
            </Grid>
            <Grid item md={4}>
              <h3> this better work</h3>
            </Grid>
          </Grid>
        </div>
      </footer>
    );
  }
}
Footer.PropTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Footer);
