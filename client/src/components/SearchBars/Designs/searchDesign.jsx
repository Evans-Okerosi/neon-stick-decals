import React from 'react';
import PropTypes from 'prop-types';
import ActiveChip from './chips.jsx';
import { Input, Grid, withStyles, Paper, IconButton } from 'material-ui';
import { Search } from 'material-ui-icons';
import { styles } from './styles';
function SearchDesigns(props) {
  const { classes, handleDelete, onChange, onButtonClick } = props;
  return (
    <div className={classes.root}>
      <Grid xs={12} md={8} wrap="no-wrap" className={classes.searchBar}>
        <Paper className={classes.paper}>
          <div>
            {this.state.searchTerms.map(term => {
              return <ActiveChip handleDelete={handleDelete} avatarImage="" />;
            })}
          </div>
          <div>
            <Input fullWidth onChange={onChange} />
            <IconButton
              onClick={onButtonClick}
              variant="fab"
              aria-label="search"
            >
              <Search />
            </IconButton>
          </div>
        </Paper>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(SearchDesigns);
