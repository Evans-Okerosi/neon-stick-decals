import React from "react";
import PropTypes from "prop-types";
import {
  Toolbar,
  Hidden,
  Button,
  AppBar,
  IconButton,
  withStyles,
  Badge
} from "material-ui";
import { NavLink } from "react-router-dom";
import { ShoppingCart, PersonPin } from "material-ui-icons";

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerIsOpen: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleDrawerButton = this.handleDrawerButton.bind(this);
  }
  handleDrawerToggle(isOpen) {
    this.setState({
      drawerIsOpen: isOpen
    });
  }
  handleDrawerButton(e) {
    e.preventDefault();
    this.handleDrawerToggle(true);
  }
  handleDrawerClose(e) {
    e.preventDefault();
    this.handleDrawerToggle(false);
  }
  render() {
    /**
     * enclose react router link components in functions so that they can work properly
     * with material ui button components.
     * for more info check material ui documentation https://material-ui.com/demos/buttons/
     */
    const LinkToCart = props => <NavLink to="/Cart" {...props} />;
    const LinkToAddSkin = props => <NavLink to="/AddSkin" {...props} />;
    const LinkToLogin = props => <NavLink to="/Login" {...props} />;
    const LinkToSignup = props => <NavLink to="/Signup" {...props} />;
    //### The value displayed on top the cart Icon.
    const badgeContent = this.props.itemsOnCart.length;
    return (
      <AppBar>
        <Toolbar position="fixed">
          <Hidden xsDown>
            <Button>{"Upload"}</Button>
            <Button>{"Popular"} </Button>
            <Button>{"Categories"}</Button>
          </Hidden>

          <div style={{ position: "relative", left: 800 }}>
            <IconButton component={LinkToCart}>
              <Badge badgeContent={badgeContent}>
                <ShoppingCart />
              </Badge>
            </IconButton>

            <Button component={LinkToSignup}>{"Sign Up"}</Button>

            <IconButton component={LinkToLogin}>
              <PersonPin />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
TopNav.propTypes = {
  itemsOnCart: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};
export default TopNav;
