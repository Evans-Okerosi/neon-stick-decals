import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
  FormHelperText,
  Input
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
        emailIsTaken:false,
        emailIsIncorrect:false,
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
    this.onDateChange = this.onDateChange.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    /**
     * Confirm the validity of entered data
     */

    // password
    if (this.state.userData.password === '') {
      this.setState({
        error: {
          ...this.state.error,
          password: true
        }
      });
    }
    // Username
    if (this.state.userData.userName === '') {
      this.setState({
        error: {
          ...this.state.error,
          userName: true
        }
      });
    }
    // Confirm password
    if (
      this.state.userData.confirm_password !==
      this.state.userData.confirm_password
    ) {
      this.setState({
        error: {
          ...this.state.error,
          confirm_password: true
        }
      });
    }
    // date of birth
    if (this.state.userData.dateOfBirth === '') {
      this.setState({
        error: {
          ...this.state.error,
          dateOfBirth: true
        }
      });
    }
    // gender
    if (this.state.userData.gender === '') {
      this.setState({
        error: {
          ...this.state.error,
          gender: true
        }
      });
    }
    // Email
    if (!emailValidator(this.state.userData.email)) {
      this.setState({
        error: {
          ...this.state.error,
          emailIsIncorrect:true
        }
      });
    }
    //make sure there are no errors before sending info to server
    const checkForErrors = ()=>{
      const ready = Object.values(this.state.error).filter(error => {
        return error ===true
      })
      if(ready) return false
    }
    //return false if any errors were found
    if(checkForErrors) return false
    
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
              ...this.state.error,
              network: true
            }
          });
          // Check the error type sent by server
        } else if (error.response.status === 409) {
          if (error.responce.data.ErrorName === 'EmailTakenError') {
            this.setState({
              error: {
                ...this.state.error,
                emailIsTaken:true
              }
            });
          }
          if (error.response.data.ErrorName === 'TakenUserNameError') {
            this.setState({
              error: {
                ...this.state.error,
                userName: true
              }
            });
          }
        }
      });
  }
  onChange(e) {
    this.setState({
      userData: {
        ...this.state.userData,
        [e.target.id]: e.target.value
      }
    });
  }
  onDateChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  onRadioChange(e) {
    this.setState({
      gender: e.target.value
    });
  }
  render() {
    let selectedDate = new Date();
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
      if (error.emailIsTaken) {
        return (
          <FormHelperText error> The email is already taken!</FormHelperText>
        );
      }
      if (error.emailIsIncorrect) {
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
              this.state.error.emailIsTaken ||
              this.state.error.emailIsIncorrect
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
          <div>
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
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <TextField
            fullWidth
            label="Date of birth:"
            id="date"
            defaultValue="2017-05-24"
            name="date"
            onChange={this.onDateChange}
            type="date"
            required
          />
          <Input type="submit" value="signup" onClick={this.onSubmit} />
          {this.state.error ? errorChecker(this.state.error) : null}
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
