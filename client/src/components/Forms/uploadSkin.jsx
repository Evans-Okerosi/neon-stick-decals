import React from 'react';
import { TextField, Input, IconButton } from 'material-ui';
import { PresentToAll } from 'material-ui-icons';
import axios from 'axios';
class UploadSkin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      category: '',
      name: '',
      uuid: '',
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
      method: 'post',
      url: '/skin/add',
      data: this.state
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log('error occured: ', error);
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
        <div>
          <form action="/upload" enctype="multipart/form-data" method="post">
            <Input type="file" name="file" />
            <IconButton onClick={this.props.buttonClick}>
              <PresentToAll />
            </IconButton>
          </form>
        </div>
      
      </div>
    );
  }
}
export default UploadSkin;
