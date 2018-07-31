import React from "react";
import PropTypes from "prop-types";
import cookie from "js-cookie";
import { Switch, Route, Redirect } from "react-router-dom";
import { CssBaseline, MuiThemeProvider } from "material-ui";
import { TopNav, Footer } from "components";
import { theme } from "variables/themes.jsx";
import appRoutes from "routes/app.jsx";

//css and fonts
import "typeface-roboto";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsOnFinalCart: [],
      viewedSkins: [],
      orderedItems:[],
      currentCartSkin: "",
      redirectToCart: false
    };
    this.onOrderButtonClick = this.onOrderButtonClick.bind(this);
    this.onFinalCartClose = this.onFinalCartClose.bind(this);
    this.onCartClose = this.onCartClose.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.getItemsOnFinalCart = this.getItemsOnFinalCart.bind(this);
  }
  onOrderButtonClick(uuid) {
    this.setState({
      currentCartSkin: uuid,
      redirectToCart:true
    });
  }
  getItemsOnFinalCart() {
    return this.state.itemsOnFinalCart;
  }
  getProps(path) {
    //### Dynamically dispatch props according to active route.
     function getCurrentCartSkin(current){
       return current
     }
    //### Cart
    if (path === "/Cart") {
      const uuid = getCurrentCartSkin(this.state.currentCartSkin);
      const onCartClose = this.onCartClose;
      const propagateRemove = this.handleRemove;
      return [uuid, onCartClose, propagateRemove];
      //### Home
    } else if (path === "/Home") {
      const onOrderButtonClick = this.onOrderButtonClick;
      return [onOrderButtonClick];
      //### FinalCart
    } else if (path === "/FinalCart") {
      const itemsOnFinalCart = this.state.itemsOnFinalCart;
      const onFinalCartClose = this.onFinalCartClose;
      return [itemsOnFinalCart, onFinalCartClose];
    }
    return null;
  }
  onFinalCartClose(orderedItems) {
    this.setState({
      orderedItems: orderedItems
    })
  }
  onCartClose(uuid) {
    let itemsOnCart = this.getItemsOnCart();
    this.setState({
      itemsOnCart: itemsOnCart.concat([uuid])
    });
    this.setState({
      redirectToCart: false
    });
  }
  handleRemove(uuid) {
    const filtered = this.state.itemsOnCart.filter(comp => {
      return uuid !== comp;
    });
    this.setState({
      itemsOnCart: filtered
    });
  }
  render() {
    const getCartRedirect = () => {
      return this.state.redirectToCart;
    };
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <TopNav itemsOnCart={this.state.itemsOnFinalCart} />
            <Switch>
              {//### When a skin is clicked we want to enable a redirect to Cart
              getCartRedirect() ? (
                <Redirect to="/Cart" />
              ) : (
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
                      render={props => (
                        <prop.component
                          {...props}
                          {...this.getProps(prop.path)}
                        />
                      )}
                    />
                  );
                })
              )}
            </Switch>
          <Footer />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default App;
