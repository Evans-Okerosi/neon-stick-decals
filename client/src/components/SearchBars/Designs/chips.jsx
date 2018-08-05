import React from 'react';
import { Chip, Avatar, withStyles } from 'material-ui';

const styles = theme=>({
    chip:{
        margin:theme.spacing.unit
    }
})
function ActiveChip(props) {
  const { classes, avaterImage, handleDelete } = props;
  return (
    <Chip
      avatar={<Avatar src={avaterImage} />}
      onDelete={handleDelete}
      className={classes.avatar}
    />
  );
}

export default withStyles(styles)(ActiveChip)
