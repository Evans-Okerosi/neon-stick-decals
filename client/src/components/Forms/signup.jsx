import React from "react";
import axios from "axios";
import DatePicker from "react-date-picker";
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom";
import {
  TextField,
  Radio,
  InputLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText
} from "material-ui";


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }
  onSubmit(e) {
    e.preventDefault();
    axios
      .post("/signup", this.state.userData)
      .then(res => {
        // Redirect to home page.
        this.props.history.push("/Home");
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  onDateChange = date => this.setState({ date });
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          fullWidth
          label="Email"
          placeHolder="myname@server.com"
          required
          onChange={this.onChange}
          type="email"
          id="email"
        />
        <TextField
          fullWidth
          label="password"
          require
          onChange={this.onChange}
          type="password"
          id="password"
        />
        <TextField
          fullWidth
          label="confirm password"
          require
          onChange={this.onChange}
          type="password"
          id="password"
        />
        <FormControl>
          <FormLabel component="legend">Gender:</FormLabel>
          <RadioGroup
            arial-label="gender"
            name="gender"
            value={this.state.gender}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
          <InputLabel required>Date of birth:</InputLabel>
          <DatePicker onChange={this.onDateChange} value={this.state.date} />
          <FormHelperText>{this.state.errorInfo}</FormHelperText>
        </FormControl>
        {this.state.error ? (
          <FormHelperText>There was an error</FormHelperText>
        ) : null}
      </form>
    );
  }
}
SignupForm.propTypes = {
  history: PropTypes.object.isRequired
}
/**
 * This component is not directly rendered by react router. using the higher order component withRouter
 * enables us to pass the history object to SignupForm so we can progrmatically navigate.
 *
 */

export default withRouter(SignupForm);
