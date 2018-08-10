import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Card,
  CardMedia,
  Button,
  Typography,
  Grid,
  CardContent
} from 'material-ui';
import { AddShoppingCart } from 'material-ui-icons';
import styles from './styles';

const getDescription = description => {
  if (!description) return 'Photo by';
  return description;
};
function InterestCard(props) {
  const { classes, image, addToCart } = props;
  // render place holder if image object is not available
  if (!image) {
    return (
      <div
        style={{
          width: '100%',
          height: 300
        }}
      >
        <img src="http://placeholder.pics/svg/300x200" alt="" />
      </div>
    );
  }
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
        <Card variant="raised" className={classes.textCard}>
          <CardContent className={classes.CardContent}>
            <Typography component="span" className={classes.text}>
              {getDescription(image.description)} by {image.user.name}
            </Typography>
            <Button
              className={classes.button}
              onClick={addToCart}
              size="small"
              variant="extendedFab"
              aria-label="Delete"
              color="primary"
            >
              <span>Add</span>
              <AddShoppingCart className={classes.extendedIcon} />
            </Button>
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
