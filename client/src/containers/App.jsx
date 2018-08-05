import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CssBaseline, MuiThemeProvider } from 'material-ui';
import { TopNav, Footer } from 'components';
import { theme } from 'variables/themes.jsx';
import appRoutes from 'routes/app.jsx';
import store from 'store/configStore';

//css and fonts
import 'typeface-roboto';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <TopNav  />
            <Switch>
              {
              appRoutes.map((prop, key) => {
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
          </Provider>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default App;
