import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import { Grid, withStyles, Typography, Button, Paper } from 'material-ui';
import { LazyLoadedSkin } from 'components';
import { intermediate } from './styles';
import CheckBoxList from './lists';
import cart from 'static/cart.jpg';
import { connect } from 'react-redux';
import {addToCart} from 'actions';

function makeid() {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
const mapStateToProps = state => ({
  cartItmes: state.images.cart
});
const mapDispatchToProps = dispatch => ({
  addToCart: () => dispatch(addToCart(makeid()))
});

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.handleButton = this.handleButton.bind(this)
  }
  handleOder(uuid) {
    let prevCookie = cookie.get('cart');
    /**
     * if there are is no cookie do not put the hyphen(-) it will lead to incorrect string splits in finalCart
     * Remove previous cookie before setting a new one.
     */
    if (prevCookie) {
      cookie.remove('cart', { path: '' });
      cookie.set('cart', (prevCookie += `-${uuid}`));
    } else if (!prevCookie) {
      cookie.set('cart', uuid);
    }
  }
  handleButton(){
    this.props.addToCart()
  }
  componentDidMount() {
    const APP_ACCESS_KEY =
      'cb9bed1bac0d0f1420c9146fe52a17c250ee98951ed0f7b85072044e6b0af009';

    axios
      .get(`https://api.unsplash.com/search/photos`, {
        headers: { Authorization: `Client-ID ${APP_ACCESS_KEY}` },
        params: {
          query: 'marble',
          page: 3,
          per_page: 6
        }
      })
      .then(res => {
        this.setState({
          images: res.data.results
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const image = {
      id: 'somerandomnumber',
      urls: {
        small: cart
      }
    };
    const props = Object.assign({}, this.props);
    const { classes } = props;
    return (
      <Grid className={classes.root} justify="center" spacing={16} container>
        <Grid item xs={12} md={6}>
          <Paper elevation={6}>
            <img
              height="100%"
              src={cart}
              alt="marble"
              style={{
                width: '100%',
                height: 'auto'
              }}
            />
          </Paper>
          <Grid spacing={8} container sm={12}>
            <Typography
              style={{
                width: '100%'
              }}
              variant="title"
            >
              More like this
            </Typography>
            {this.state.images.length !== 0
              ? this.state.images.map(image => {
                  return (
                    <Grid item>
                      <Paper
                        elevation={6}
                        style={{
                          paddingBottom: 0
                        }}
                      >
                        <img
                          height={100}
                          width={100}
                          src={image.urls.small}
                          alt={image.description}
                        />
                      </Paper>
                    </Grid>
                  );
                })
              : null}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="display1">Marble</Typography>
          <Typography variant="subheading">
            Imagine your device, only better. premium grade vinyl,
            professionally printed and perfectly cut. <br /> Awsomeness included
            with every single one. Imagine your device, only better. premium
            grade vinyl, professionally printed and perfectly cut. Awsomeness
            included with every single one. Imagine your device, only better.
            premium grade vinyl, professionally printed and perfectly cut.
            Awsomeness included with every single one. Imagine your device, only
            better. premium grade vinyl, professionally printed and perfectly
            cut. Awsomeness included with every single one
          </Typography>
          <Typography variant="title">Select Your laptop model</Typography>
          <div>
            <CheckBoxList />
            <Button type="fill" onClick={this.handleButton} color="warning">
              Order
            </Button>
            <Button type="fill" onClick={this.handleBuy} color="primary">
              Wish List
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }
}
Cart.propTypes = {
  onCartClose: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(intermediate)(Cart));
