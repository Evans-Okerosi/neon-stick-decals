import React from "react";
import axios from "axios";
import Authenticate from "utils/authenticate";
import emailValidator from "utils/emailValidator";
import PropTypes from "prop-types";
import {
  Input,
  Typography,
  Card,
  TextField,
  FormHelperText,
  withStyles
} from "material-ui";
const styles = theme => ({
  root: {
    width: "100%",
    height: 300,
    marginTop: "1em",
    padding: 32
  },
  card: {
    marginTop: "7em",
    minWidth: 500,
    background: theme.palette.primary.light,
    opacity: 0.9
  },
  typography: {
    marginTop: "1em"
  }
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();

    let isValid = emailValidator(this.state.email);
    if (!isValid) {
      this.setState({ error: { emailError: true } });
    }
    // send credentials to the server
    axios
      .post("/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        Authenticate.authenticateUser(res.data.token);
      })
      .catch(error => {
        console.log(error)
        if (error.response.status === 401) {
          this.setState({
            error: { credentialsError: true }
          });
        }
      });
  }
  onChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  render() {
    const classes = this.props.classes;
    // check for errors and display  error messages at the bottom
    const errorState = error => {
      if (error.networkError) {
        return (
          <FormHelperText error>
            We could not connect to the server, Please try again!
          </FormHelperText>
        );
      } else if (error.credentialsError) {
        return (
          <FormHelperText error>
            Invalid email or password! Please try again.
          </FormHelperText>
        );
      } else if(error.emailError){
        return (
          <FormHelperText error>
            Enter your email in the format: example@server.com!
          </FormHelperText>
        );
      }
    };
    return (
      <Card className={classes.card} raised>
        <Typography
          className={classes.typography}
          color="secondary"
          align="center"
          variant="display2"
        >
          Login:
        </Typography>
        <form className={classes.root} onSubmit={this.onSubmit}>
          <TextField
            margin="normal"
            error={this.state.error.emailError}
            fullWidth
            label="Email"
            placeHolder="myname@server.com"
            required
            onChange={this.onChange}
            type="text"
            id="email"
          />
          <TextField
            margin="normal"
            error={this.state.error.passwordError}
            fullWidth
            label="password"
            required
            onChange={this.onChange}
            type="password"
            id="password"
          />
          <Input type="submit" value="Login:" onClick={this.state.onSubmit}/>
          {this.state.error ? errorState(this.state.error) : null}
        </form>
      </Card>
    );
  }
}
LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(LoginForm);
