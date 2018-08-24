import React from 'react';
import PropTypes from 'prop-types';
import ActiveChip from './chips.jsx';
import { Input, Grid, withStyles, Paper, IconButton } from 'material-ui';
import { Search } from 'material-ui-icons';
import { styles } from './styles';
function SearchDesigns(props) {
  const { classes, handleDelete, handleChange, onButtonClick, searchTerms } = props;
  return (
    <div className={classes.root}>
      <Grid md={10} wrap="no-wrap" className={classes.searchBar}>
        <Paper className={classes.paper}>
          <div >
            {searchTerms
              ? searchTerms.map(term => {
                  return (
                    <ActiveChip term={term} handleDelete={handleDelete} avatarImage=""/>
                    
                  );
                })
              : null}
          </div>
          <div className={classes.inputContainer} >
            <Input className={classes.input} disableUnderline onChange={handleChange} />
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
