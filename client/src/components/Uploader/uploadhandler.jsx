import React from "react";
import Uploader from "./uploader.jsx";

const UploadHandler = props => (
  <React.Fragment>
    <p>
      <label htmlFor="file">Your Design:</label>{" "}
      <Uploader
        id="file"
        name="file"
        data-crop
        data-preview-step
        data-public-key="bae64276116b6e4c9748"
        data-images-only
        onChange={file => {
          console.log("File changed: ", file);

          if (file) {
            file.progress(info =>
              console.log("File progress: ", info.progress)
            );
            file.done(info => console.log("File uploaded: ", info));
          }
        }}
        onUploadComplete={props.uploadComplete}
      />
    </p>
  </React.Fragment>
);

export default UploadHandler;
