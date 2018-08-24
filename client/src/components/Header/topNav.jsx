import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, AccountCircle } from 'material-ui-icons';
import { styles } from './styles';
import auth from 'utils/authenticate';
import { removeCartItems,logout } from 'actions';
import {
  Toolbar,
  Hidden,
  Button,
  AppBar,
  IconButton,
  Badge,
  withStyles,
  Menu,
  MenuItem,
  Typography
} from 'material-ui';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  cart: state.images.cart,
  loggedIn: state.authState.loggedIn
});

const mapDispatchToProps = dispatch => ({
  removeCartItems: () => dispatch(removeCartItems()),
  logout: ()=> dispatch(logout())
});

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerIsOpen: false,
      anchorEl: null
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleDrawerButton = this.handleDrawerButton.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
  openMenu(e) {
    this.setState({ anchorEl: e.currentTarget });
  }
  handleClose(e) {
    this.setState({ anchorEl: null });
    if (e.target.id === 'logout') {
      auth.deauthenticate();
      this.props.logout()
    }
    if (e.target.id === 'interests') {
      this.props.history.push('/Interests');
    }
  }
  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    /**
     * Enclose react router link components in functions so that they can work properly
     * with material ui button components.
     * for more info check material ui documentation https://material-ui.com/demos/buttons/
     */
    const LinkToCart = props => <NavLink to="/FinalCart" {...props} />;
    const LinkToUpload = props => <NavLink to="/Upload" {...props} />;
    const LinkToHome = props => <NavLink to="/Home" {...props} />;
    const LinkToDesigns = props => {
      // pass url parameter
      const path = `/Designs/${props.filter}`;
      return <NavLink to={path} {...props} />;
    };
    const LinkToCategories = props=><NavLink to="/Categories" {...props}/>
    const LinkToDashboard = props => <NavLink to="Dashboard" {...props} />;
    const LinkToLogin = props => <NavLink to="/Login" {...props} />;
    const LinkToSignup = props => <NavLink to="/Signup" {...props} />;
    const LinkToSelectInterests = props => (
      <NavLink to="/Interests" {...props} />
    );
    // The value displayed on top the cart Icon.
    let badgeContent 
    let color
    if(this.props.cart.length>0 ){
      badgeContent = this.props.cart.length
      color="red"
    }
    
    return (
      <AppBar classes={classes.AppBar} color="primary">
        <Toolbar position="fixed">
          <Hidden xsDown>
            <div className={classes.navigation}>
              <Button className={classes.button} component={LinkToHome}>
                {'Home'}
              </Button>
              <Button className={classes.button} component={LinkToUpload}>
                {'Upload'}
              </Button>
              <Button className={classes.button} component={LinkToDesigns}>
                {'Popular'}
              </Button>
              <Button className={classes.button} component={LinkToCategories}>
                {'Categories'}
              </Button>
              <Button
                className={classes.button}
                component={LinkToSelectInterests}
              >
                {'Interests'}
              </Button>
              {auth.checkAuth() ? (
                <Button className={classes.button} component={LinkToDashboard}>
                  {'Dashboard'}
                </Button>
              ) : null}
            </div>
          </Hidden>
          {this.props.loggedIn ? (
            <span>
              <IconButton
                aria-haspopup="true"
                onClick={this.openMenu}
                className={classes.button}
              >
                <AccountCircle />
              </IconButton>
              <Typography>{'Evans'}</Typography>
              <Menu
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                anchorEl={anchorEl}
              >
                <MenuItem id="profile" onClick={this.handleClose}>
                  Profile
                </MenuItem>
                <MenuItem onClick={this.handleClose} id="interests">
                  Interestes
                </MenuItem>
                <MenuItem id="logout" onClick={this.handleClose}>
                  Logout
                </MenuItem>
              </Menu>
            </span>
          ) : (
            <span>
              <Button className={classes.button} component={LinkToSignup}>
                {'Sign Up'}
              </Button>
              <Button className={classes.button} component={LinkToLogin}>
                {'Login'}
              </Button>
            </span>
          )}

          <div>
            <IconButton style={{
              color:color
            }} className={classes.button} component={LinkToCart}>
              <Badge badgeContent={badgeContent} >
                <ShoppingCart />
              </Badge>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(TopNav)));
