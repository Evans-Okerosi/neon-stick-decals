import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Grid,
  Input,
  withStyles,
  Button,
  Paper,
  Typography
} from 'material-ui';
import { imageResponsive } from 'variables/styles.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FinalList from './finalList';
import { removeCartItems } from 'actions';
const mapStateToProps = state => ({
  cartItems: state.images.cart
});
const mapDispatchToProps = dispatch => ({
  removeCart: () => dispatch(removeCartItems())
});
class FinalCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.handleBuy = this.handleBuy.bind(this);
  }
  componentDidMount() {}
  handleBuy() {
    axios
      .post('/buy', {
        params: this.props.cartItems
      })
      .then(response => {
        this.props.history.push('/Home');
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const classes = this.props.clasess;
    return (
      <div
        style={{
          height: 650
        }}
      >
        <Paper
          style={{
            padding: 16
          }}
          elevation={6}
        >
          <FinalList />

          <Typography paragraph variant="display1">
            <span>Total: </span>
            sh.
            <span>1500 </span>
            <div>
              <span>Phone:</span>
              <Input type="text" id="phone" />{' '}
              <Button
                style={{
                  background: 'rgba(039,0,0,0.1)'
                }}
                color="error"
                onClick={this.handleBuy}
              >
                Check Out
              </Button>
            </div>
          </Typography>
        </Paper>
      </div>
    );
  }
}
FinalCart.propTypes = {
  itemsOnFinlaCart: PropTypes.array.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(imageResponsive)(withRouter(FinalCart)));
