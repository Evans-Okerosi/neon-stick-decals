import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import PropTypes from  "prop-types"
import { Grid, withStyles } from "material-ui";
import { imageResponsive } from "variables/styles.jsx";
import { Bttn } from "components";
class FinalCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    axios
      .get("cart", {
        params: this.props.itemsOnFinlaCart
      })
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const classes = this.props.clasess;
    return (
      <div>
        {this.state.items.map(item => {
          return (
            <Grid container key={item}>
              <Grid item xs={4}>
                <img className={classes} src={item.uuid} alt={item.caption} />
              </Grid>
              <Grid item xs={8}>
                Price: {item.price}
                <Bttn
                  color="primary"
                  xs
                  onClick={this.props.handleRemove(item.uuid)}
                >
                  Remove
                </Bttn>
              </Grid>
            </Grid>
          );
        })}
        <div>
          <Bttn
            color="primary"
            xs
            onClick={this.props.onFinalCartClose()}
            type="warning"
          > 
          Check Out
          </Bttn>
        </div>
      </div>
    );
  }
}
FinalCart.propTypes = {
  itemsOnFinlaCart: PropTypes.array.isRequired,
  onFinalCartClose: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}
export default withStyles(imageResponsive)(FinalCart);
