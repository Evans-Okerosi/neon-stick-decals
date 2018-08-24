import React from 'react';
import { connect } from 'react-redux';
import { Grid, withStyles, Typography } from 'material-ui';
import { SearchDesigns, LazyLoadedSkin } from 'components';
import { styles } from './styles';
import { requestImages, selectCategory } from 'actions';

const mapStateToProps = (state, ownProps) => ({
  images: state.images.images,
  category: state.category
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  searchImages: search => dispatch(requestImages(search)),
  selectCategory: category => dispatch(selectCategory(category))
});
class Designs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: ['ocean', 'earth'],
      searchField: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchButtonClick = this.searchButtonClick.bind(this);
  }
  componentDidMount() {}
  handleChange(e) {
    this.setState({
      searchField: e.target.value
    });
  }
  searchButtonClick() {
    const { searchImages, selectCategory, category } = this.props;
    selectCategory(this.state.searchField);
    searchImages(this.state.searchField);
  }
  render() {
    const { images, classes } = this.props;
    if (!images) {
      return (
        <Grid
          alignItems="center"
          justify="center"
          container
          className={classes.preloader}
        >
          <Typography variant="display3">Loading...</Typography>
        </Grid>
      );
    }
    // when we are getting results from a search
    if (images.results) {
      return (
        <div>
          <SearchDesigns
            searchTerms={this.state.searchTerms}
            handleChange={this.handleChange}
            onButtonClick={this.searchButtonClick}
          />
          <Grid justify="center" spacing={16} container>
            {images.results.map(image => {
              // the height should be the same as the one defined in the object styles
              return (
                <Grid key={image.id} item>
                  <LazyLoadedSkin image={image} height={200} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      );
    }
    return (
      <div>
        <SearchDesigns
          searchTerms={this.state.searchTerms}
          handleChange={this.handleChange}
          onButtonClick={this.searchButtonClick}
        />
        <Grid justify="center" spacing={16} container>
          {images.map(image => {
            // the height should be the same as the one defined in the object styles
            return (
              <Grid key={image.id} item>
                <LazyLoadedSkin image={image} height={200} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Designs));
