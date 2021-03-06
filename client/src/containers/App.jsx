import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CssBaseline, MuiThemeProvider, withStyles } from 'material-ui';
import {connect} from 'react-redux'
import { TopNav, Footer } from 'components';
import { theme } from 'variables/themes.jsx';
import appRoutes from 'routes/app.jsx';
import { requestImages } from 'actions';
import {styles} from './styles'

//css and fonts
import 'typeface-roboto';
const mapStateToProps = state => ({
  images: state.images,
  isFetching: state.isFetching
});
const mapDispatchToProps = dispatch => ({
  getImages:()=> dispatch(requestImages())
});
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    // load initial images
   this.props.getImages()
  }
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <TopNav />
          <Switch>
            {appRoutes.map((prop, key) => {
              if (prop.redirect) {
                return (
                  <Redirect
                    to={{
                      pathname: prop.to,
                      state: { from: prop.path }
                    }}
                    key={key}
                  />
                );
              }
              return (
                <Route
                  path={prop.path}
                  key={key}
                  render={props => <prop.component {...props} />}
                />
              );
            })}
          </Switch>
          <Footer />
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));

