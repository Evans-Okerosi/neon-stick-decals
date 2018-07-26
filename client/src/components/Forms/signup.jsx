import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TimePicker from 'material-ui-pickers/TimePicker'
import DatePicker from 'material-ui-pickers/DatePicker';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import { withRouter } from 'react-router-dom';
import {
  Typography,
  withStyles,
  Card,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText
} from 'material-ui';
import emailValidator from 'utils/emailValidator';
const styles = theme => ({
  card: {
    backround: theme.palette.primary.light,
    padding: 24,
    marginTop: '5em',
    width: 500
  }
});
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      userData: {
        date: new Date(),
        gender: 'male',
        name: '',
        email: '',
        userName: '',
        password: ''
      },
      error: {
        email: {
          isTaken: false,
          isIncorrect: false
        },
        network: false,
        userName: false,
        gender: false,
        dateOfBirth: false,
        password: false,
        password_confirm: false
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this)
  }
  onSubmit(e) {
    e.preventDefault();
    /**
     * Confirm the validity of entered data
     */

    // Check for empty fields
    if (this.state.userData.password === '') {
      this.setState({
        error: {
          password: true
        }
      });
      return false;
    }
    // Username
    if (this.state.userData.userName === '') {
      this.state.setState({
        error: {
          userName: true
        }
      });
      return false;
    }
    // Confirm password
    if (
      this.state.userData.confirm_password !==
      this.state.userData.confirm_password
    ) {
      this.setState({
        error: {
          confirm_password: true
        }
      });
      return false;
    }
    // date of birth
    if (this.state.userData.dateOfBirth === '') {
      this.setState({
        error: {
          dateOfBirth: true
        }
      });
      return false;
    }
    // gender
    if (this.state.userData.gender === '') {
      this.setState({
        error: {
          gender: true
        }
      });
      return false;
    }
    // Email
    if (!emailValidator(this.state.userData.email)) {
      this.setState({
        error: {
          email: {
            isIncorrect: true
          }
        }
      });
      return false;
    }
    // send data to server
    axios
      .post('/signup', this.state.userData)
      .then(res => {
        // Redirect to home page.
        this.props.history.push('/Home');
      })
      .catch(error => {
        if (error.network) {
          this.setState({
            error: {
              network: true
            }
          });
          // Check the error type sent by server
        } else if (error.response.status === 409) {
          if (error.responce.data.ErrorName === 'EmailTakenError') {
            this.setState({
              error: {
                email: {
                  isTaken: true
                }
              }
            });
          }
          if (error.response.data.ErrorName === 'TakenUserNameError') {
            this.setState({
              error: {
                userName: true
              }
            });
          }
        }
      });
  }
  onChange(e) {
    this.setState({
      userData:{
        [e.target.id]: e.target.value
      }
    });
  }
  onDateChange(date){
    this.setState({
      date:date
    })
  }
  onRadioChange(e) {
    this.setState({
      gender: e.target.value
    });
  }
  render() {
    let selectedDate = new Date()
    const classes = this.props.classes;
    // Check for errors and display message
    const errorChecker = error => {
      if (error.network) {
        return (
          <FormHelperText error>
            Sorry we could not connect to the server! please check your
            connection or try again later.
          </FormHelperText>
        );
      }
      if (error.Name) {
        return (
          <FormHelperText error>
            Sorry the user name is already taken! choose another one.
          </FormHelperText>
        );
      }
      if (error.email.isTaken) {
        return (
          <FormHelperText error> The email is already taken!</FormHelperText>
        );
      }
      if (error.email.isIncorrect) {
        return (
          <FormHelperText error>
            The email Format is not correct! Example format: myname@company.com
          </FormHelperText>
        );
      }
      if (error.password_confirm) {
        return (
          <FormHelperText error>
            The passwords you entered do not match!
          </FormHelperText>
        );
      }
    };
    return (
      <Card className={classes.card} raised>
        <Typography align="center" variant="display2">
          Signup:
        </Typography>
        <form onSubmit={this.onSubmit}>
          <TextField
            error={this.state.error.userName}
            fullWidth
            label="User name:"
            placeHolder="select a user name"
            required
            onChange={this.onChange}
            type="text"
            id="userName"
          />
          <TextField
            error={this.state.error.name}
            fullWidth
            label="Name:"
            placeHolder="Enter Your name"
            required
            onChange={this.onChange}
            type="text"
            id="name"
          />
          <TextField
            error={
              this.state.error.email.isTaken ||
              this.state.error.email.isIncorrect
            }
            fullWidth
            label="Email"
            placeHolder="myname@server.com"
            required
            onChange={this.onChange}
            type="email"
            id="email"
          />
          <TextField
            error={this.state.error.password}
            fullWidth
            label="Password"
            required
            onChange={this.onChange}
            type="password"
            id="password"
          />
          <TextField
            error={this.state.error.confirm_password}
            fullWidth
            label="Confirm password"
            required
            onChange={this.onChange}
            type="password"
            id="password_confirm"
          />
          <FormControl component="fieldset">
            <FormLabel component="legend" error={this.state.error.gender}>
              Gender:
            </FormLabel>
            <RadioGroup
              arial-label="Gender:"
              name="gender"
              value={this.state.gender}
              onChange={this.onRadioChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            {this.state.error ? errorChecker(this.state.error) : null}
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="pickers">
              <DatePicker
                value={selectedDate}
                onChange={this.onDateChange}
              />
              <TimePicker
                value={selectedDate}
                onChange={this.onDateChange}
              />
            </div>
          </MuiPickersUtilsProvider>
        </form>
      </Card>
    );
  }
}
SignupForm.propTypes = {
  history: PropTypes.object.isRequired
};
/**
 * Using the higher order component withRouter
 * enables us to pass the history object to SignupForm so we can progrmatically navigate.
 */

export default withStyles(styles, { withTheme: true })(withRouter(SignupForm));
