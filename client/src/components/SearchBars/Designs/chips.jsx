import React from 'react';
import { Chip, Avatar, withStyles } from 'material-ui';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit
  }
});
function ActiveChip(props) {
  const { classes, handleDelete, term } = props;
  return (
    <Chip
      label={term}
      onDelete={handleDelete}
      className={classes.avatar}
    />
  );
}

export default withStyles(styles)(ActiveChip);
