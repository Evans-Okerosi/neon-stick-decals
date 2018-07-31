import React from "react";
import PropTypes from "prop-types"
import cookie from "js-cookie"
import { Grid, withStyles, Typography,Button } from "material-ui";
import { LazyLoadedSkin } from "components";


class Cart extends React.Component {
  handleOder(uuid) {
    let prevCookie = cookie.get("cart");
    /**
     * if there are is no cookie do not put the hyphen(-) it will lead to incorrect string splits in finalCart
     * Remove previous cookie before setting a new one.
     */
    if (prevCookie) {
      cookie.remove("cart", { path: "" });
      cookie.set("cart", (prevCookie += `-${uuid}`));
    } else if (!prevCookie) {
      cookie.set("cart", uuid);
    }
    
  }
  render() {
    const props = Object.assign({}, this.props);
    return (
      <Grid container>
        <Grid item xs={12} md={6}>
          <LazyLoadedSkin uuid={props.uuid} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="display1">{props.caption}</Typography>
          <Typography variant="body1">
            Imagine your device, only better. premium grade vinyl,
            professionally printed and perfectly cut. Awsomeness included with
            every single one. Imagine your device, only better. premium grade
            vinyl, professionally printed and perfectly cut. Awsomeness included
            with every single one. Imagine your device, only better. premium
            grade vinyl, professionally printed and perfectly cut. Awsomeness
            included with every single one. Imagine your device, only better.
            premium grade vinyl, professionally printed and perfectly cut.
            Awsomeness included with every single one
          </Typography>
          <div>
            <Button type="fill" onClick={this.handleBuy} color="warning" >Order</Button>
            <Button type="fill" onClick={this.handleBuy} color="primary" >Wish List</Button>
          </div>
        </Grid>
      </Grid>
    );
  }
}
Cart.propTypes = {
onCartClose: PropTypes.func.isRequired
}
export default Cart