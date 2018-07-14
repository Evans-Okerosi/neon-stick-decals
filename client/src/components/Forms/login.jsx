import React from "react";
import axios from "axios";
import Authenticate from "utils/authenticate";
import emailValidator from "utils/emailValidator";
import PropTypes from "prop-types";
import {
  Typography,
  Card,
  Paper,
  TextField,
  Input,
  FormHelperText,
  withStyles
} from "material-ui";
const styles = theme => ({
    root: { 
        width:"100%",
        height:300,
        marginTop:"1em",
        padding: 32
    },
    card: {
        marginTop:"7em",
        minWidth: 500,
        background: theme.palette.primary.light,
        opacity: 0.9,
        '&media': {
          
        }
      },
      typography:{
        marginTop:"1em"
      }
  
});
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordError: false,
      emailError: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();

    let isValid = emailValidator(this.state.email);
    if (!isValid) {
      this.setState({ emailError: true });
      this.setState({
        emailError:true
      })
    }
    axios
      .post("/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        Authenticate.authenticateUser(res.data.token);
      })
      .catch(error => {
        this.setState({ error: error });
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
    return (
      <Card className={classes.card} raised>
      <Typography className={classes.typography} color="secondary" align="center" variant="display2">Login:</Typography>
        <form className={classes.root} onSubmit={this.onSubmit}>
          <TextField
          margin="normal"
            error={this.state.emailError}
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
            error={this.state.passwordError}
            fullWidth
            label="password"
            required
            onChange={this.onChange}
            type="password"
            id="password"
          />
          {this.state.passwordError || this.state.EmailError ? (
            <FormHelperText>
              There was an error. Please check the form
            </FormHelperText>
          ) : null}
          <Input type="submit" value="login" />
        </form>
      </Card>
    );
  }
}
LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(LoginForm);
