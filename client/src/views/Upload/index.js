import React from 'react';
import { withStyles, Grid, Button, Card, Typography } from 'material-ui';
import { UploadSkin } from 'components';
import { styles } from './styles';
import Progress from './progress';
import color from 'static/color.jpg'
class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      showImage:false
    };
    this.buttonClick = this.buttonClick.bind(this);
  }
  buttonClick() {
    this.setState({
      showLoader: true
    });
    this.timeout()
  }
  timeout(){
    setTimeout(() => {
      this.setState({
        showImage:true
      })
    },300);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid
        className={classes.root}
        alignItems="center"
        container
        justify="center"
      >
        <Grid item sm={10} md={8}>
          <Card className={classes.card} raised>
            {this.state.showLoader ? (
              <div>
                <Typography variant="display1">Uploading</Typography>
                <Progress />
              </div>
            ) : (
              <UploadSkin buttonClick={this.buttonClick} />
            )}
          </Card>
          {
            this.state.showImage?<Card>
            <img height={400}  src={color}/>
          </Card>:null
          }
          
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Upload);
