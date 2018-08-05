import React from 'react';
import { connect } from 'react-redux';
import { Grid, withStyles } from 'material-ui';
import { SelectSearch, SearchDesigns, LazyLoadedSkin } from 'components';
import {styles} from './styles'
import { } from 'actions'

const mapStateToProps = (state, ownProps) => ({
  images: state.images
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getImages:dispatch()
});
class Designs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: ['ocean', 'earth'],
      searchFiled: ''
    };
  }
  componentDidMount(){

  }
  onChange(e) {
    this.setState({
      searchFiled: e.target.value
    });
  }
  searchButtonClick() {
    this.setState(prevState => ({
      searchTerms: prevState.searchTerms.push(prevState.searchFiled),
      searchFiled: ''
    }));
  }
  render() {
    const { images } = this.props;
    return (
      <div>
        <SearchDesigns />
        <SelectSearch />
        <Grid container>
          {images.map(image => {
            // the height should be the same as the one defined in css
            return <LazyLoadedSkin image={image} height={200} />;
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
