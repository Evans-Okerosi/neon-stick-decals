import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Card,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  CardContent
} from 'material-ui';
import { AddShoppingCart } from 'material-ui-icons';
import styles from './styles';

function InterestCard(props) {
  const { classes, image, addToCart } = props;
  return (
    <Grid item className={classes.container}>
      <div>
        <Card>
          <CardMedia
            className={classes.image}
            image={image.urls.small}
            title={image.description}
          />
        </Card>
      </div>
      <div>
        <Card className={classes.textCard}>
          <CardContent>
            <Typography className={classes.text}>
              {image.description} by {image.username}
            </Typography>
            <IconButton onClick={addToCart}
              aria-label="Add"
              className={classes.button}
            >
              <AddShoppingCart />
            </IconButton>
          </CardContent>
        </Card>
      </div>
    </Grid>
  );
}
InterestCard.PropTypes = {
  image: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(InterestCard);
