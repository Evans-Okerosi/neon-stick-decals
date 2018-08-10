import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Typography,
  withStyles,
  Card,
  Input,
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
      userData: {
        date: '',
        gender: '',
        name: '',
        email: '',
        userName: '',
        password: '',
        confirm_password: ''
      },
      error: {
        emailIsTaken: false,
        emailIsIncorrect: false,
        date: false,
        network: false,
        userName: false,
        gender: false,
        password: false,
        confirm_password: false,
        name: false
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    /**
     * Confirm the validity of entered data
     */

    // password
    if (this.state.userData.password === '') {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          password: true
        }
      }));
    }
    // Username
    if (this.state.userData.userName === '') {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          userName: true
        }
      }));
    }
    // Confirm password. false always
    /*if (this.state.userData.password !== this.state.userData.confirm_password) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          confirm_password: true
        }
      }));
    }*/

    // date of birth
    if (this.state.userData.date === '') {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          date: true
        }
      }));
    }

    // gender
    if (this.state.userData.gender === '') {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          gender: true
        }
      }));
    }

    // Email
    if (!emailValidator(this.state.userData.email)) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          emailIsIncorrect: true
        }
      }));
    }
    // name
    if (this.state.userData.name === '') {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          name: true
        }
      }));
    }
    this.setState({
      validationFinished: true
    });
  }
  componentDidUpdate() {
    // esnsure data is sent only after validation is complete
    if (this.state.validationFinished) this.sendData(this.state);
  }
  sendData(state) {
    // return if any errors axist
    const shouldAbort = Object.values(state.error).indexOf(true);
    if (shouldAbort !== -1) return;
    alert(shouldAbort);

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
        } else if (error.response) {
          if (error.response.status === 409) {
            if (error.responce.data.ErrorName === 'EmailTakenError') {
              this.setState(prevState => ({
                error: {
                  ...prevState.error,
                  emailIsTaken: true
                }
              }));
            }
            if (error.response.data.ErrorName === 'TakenUserNameError') {
              this.setState(prevState => ({
                error: {
                  ...prevState.error,
                  userName: true
                }
              }));
            }
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
  onRadioChange(e) {
    this.setState({
      userData: {
        ...this.state.userData,
        gender: e.target.value
      }
    });
  }
  render() {
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
              this.state.error.emailIsTaken || this.state.error.emailIsIncorrect
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
              value={this.state.userData.gender}
              onChange={this.onRadioChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <div>
            <TextField
              type="date"
              onChange={this.onChange}
              label="Date Of Birth:"
              required
              defaultValue="2017-07-01"
              id="date"
              error={this.state.error.date}
            />
          </div>
          <div>
            <Input value="Submit:" type="submit" onClick={this.onSubmit} />
          </div>
          <div>{this.state.error ? errorChecker(this.state.error) : null}</div>
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
