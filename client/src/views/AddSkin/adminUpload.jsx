import React from "react"
import { UploadSkin }from "components"
import { Typography } from "material-ui"
 
class AdminUpload extends React.Component{
    render(){
        return(
            <React.Fragment>
               <Typography type="title">ADD SKIN </Typography>
               <UploadSkin/>
            </React.Fragment>
        )
    }
}

export default AdminUpload