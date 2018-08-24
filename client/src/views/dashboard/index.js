import React from 'react';
import Chart from './charts';
import Chart2 from './chart2'
import Table from './tables';
import { Grid, withStyles, Typography, Paper, Avatar } from 'material-ui';
import { styles } from './styles';
import evans from 'static/nature.jpg';
import ImageAvatar from './avater';
class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid justify="center" container spacing={16} className={classes.root}>
      <Typography style={{
          marginTop:16,
          marginLeft:16,
          width:'100%'
      }} variant='display2'>
      Dashboard
      </Typography>
        <Grid item md={6}>
          <Table />
        </Grid>
        <Grid
          style={{
            marginTop: 16,
            width: 450
          }}
          item
          md={6}
        >
          <Paper elevation={6}>
            <Typography variant="display1">Congrats</Typography>
            <ImageAvatar />
          </Paper>
        </Grid>
        <Grid md={6} item>
          <Paper elevation={6}>
            <Chart />
          </Paper>
        </Grid>
        <Grid md={6} item>
          <Paper elevation={6}>
            <Chart2 />
          </Paper>
        </Grid>

        <Typography>['where is the chart']</Typography>
      </Grid>
    );
  }
}
export default withStyles(styles)(Dashboard);
