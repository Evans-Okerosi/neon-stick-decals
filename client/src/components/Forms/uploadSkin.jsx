import React from "react";
import { TextField } from "material-ui";
import { UploadHandler } from "components";
import axios from "axios";
class UploadSkin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      category: "",
      name: "",
      uuid: "",
      uploadComplete: false
    };
    this.uploadComplete = this.uploadComplete.bind(this);
  }
  uploadComplete(info) {
    if (info === undefined || info === null) return;
    this.setState({
      uploadComplete: true,
      uuid: info.uuid
    });
  }
  onSubmit(e) {
    axios({
      method: "post",
      url: "/skin/add",
      data: this.state
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log("error occured: ", error);
      });
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  render() {
    return (
      <div>
        <UploadHandler uploadComplete={this.uploadComplete} />
        <form onSubmit={this.onSubmit} name="uploadSkin">
          <TextField
            fullWidth
            label="caption"
            placeHolder="Name of design..."
            required
            onChange={this.onChange}
            type="text"
            id="caption"
          />
          <TextField
            fullWidth
            label="categories"
            required
            onChange={this.onChange}
            type="text"
            id="category"
          />
          <TextField
            fullWidth
            label="Name"
            placeHolder="type your name..."
            required
            onChange={this.onChange}
            type="text"
            id="name"
          />
          <TextField
            fullWidth
            label="More Information"
            placeHolder="Brief description about the design..."
            required
            onChange={this.onChange}
            type="text"
            id="name"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
export default UploadSkin;
