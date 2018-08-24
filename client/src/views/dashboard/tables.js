import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper} from 'material-ui';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'black',
    color: 'white',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 16,
    overflowX: 'auto',
  },
  table: {
    minWidth: 600,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: grey[50],
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('wite light', 159, 6.0, 24, 4.0),
  createData('marble', 237, 9.0, 37, 4.3),
  createData('Nature', 262, 16.0, 24, 6.0),
  createData('space things', 305, 3.7, 67, 4.3),
  createData('Beauty', 356, 16.0, 49, 3.9),
];

function CustomizedTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Design Name:</CustomTableCell>
            <CustomTableCell numeric>Views</CustomTableCell>
            <CustomTableCell numeric>Likes</CustomTableCell>
            <CustomTableCell numeric>Pchases</CustomTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.name}
                </CustomTableCell>
                <CustomTableCell numeric>{row.calories}</CustomTableCell>
                <CustomTableCell numeric>{row.fat}</CustomTableCell>
                <CustomTableCell numeric>{row.carbs}</CustomTableCell>
                
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
