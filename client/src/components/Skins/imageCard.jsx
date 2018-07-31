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
import { Dehaze } from 'material-ui-icons';
import styles from './styles';

function InterestCard(props) {
  const { classes } = props;
  return (
    <Grid item className={classes.container}>
      <div>
        <Card>
          <CardMedia
            className={classes.image}
            image={props.image}
            title="Some Random Pic"
          />
        </Card>
      </div>
      <div>
        <Card className={classes.textCard}>
          <CardContent>
            <Typography className={classes.text}>
              this is something you would like. this is something you would like
              . this is something you would like
            </Typography>
            <Button
              variant="extendedFab"
              aria-label="Delete"
              className={classes.button}
            >
              <Dehaze />
              Add
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
