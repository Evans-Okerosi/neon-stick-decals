import React from "react";
import { TextField, withStyles } from "material-ui";



const FormElement = props => {
  return (
    <TextField
      multiline={props.multiline}
      autoFocus={props.autoFocus}
      required={props.required}
      fullWidth
      id={props.id}
      label={props.label}
      onChange={props.onChange}
      type={props.type}
    />
  );
};
FormElement.muiName = "TextField";

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Fname: "",
      Lname: "",
      company: "",
      phone: "",
      comment: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSubmit(e) {
    e.preventDefault;
  }
  onChange(e) {
    if (e.target.id === "phone") {
      if (isNaN(e.target.value)) return false;
    }
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  componentDidCatch(err, info){
console.log('error started here', err + info)
  }
  render() {
    return (
      <div >
        <form onSubmit={this.onSubmit} name="ContactForm"  >
          <FormElement
            label="Fisrt Name"
            id="Fname"
            type="text"
            onChange={this.onChange}
          />
          <FormElement
            required
            label="Last Name"
            id="Lname"
            type="text"
            onChange={this.onChange}
          />
          <FormElement
            label="Company"
            id="company"
            type="text"
            onChange={this.onChange}
          />
          <FormElement
            label="Phone Number"
            id="phone"
            type="text"
            onChange={this.onChange}
          />
          <FormElement
            label="Comment"
            id="comment"
            type="text"
            multiline
            onChange={this.onChange}
          />
        </form>
      </div>
    );
  }
}

export default ContactForm;
