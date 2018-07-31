import React from 'react'
import {Grid, withStyles} from 'material-ui'
import InterestCard from './InterestCard'
import {SelectInterestsStyles} from './styles.jsx'
let images = [
    'https://source.unsplash.com/random/1024x512',
    'https://source.unsplash.com/random/1024x512',
    'https://source.unsplash.com/random/1024x512',
    'https://source.unsplash.com/random/1024x512',
    'https://source.unsplash.com/random/1024x512',
    'https://source.unsplash.com/random/1024x512',
    'https://source.unsplash.com/random/1024x512',
    'https://source.unsplash.com/random/1024x512',
    'https://source.unsplash.com/random/1024x512',
    'https://source.unsplash.com/random/1024x512',
    'https://source.unsplash.com/random/1024x512',
    'https://source.unsplash.com/random/1024x512',
]
function SelectInterests(props){
    return(
        <Grid className={props.classes.root} spacing={16} justify="center" wrap container >
          {
              images.map(  interest=>{
                  return(
                    <InterestCard image= {interest}/>
                  )
              })
          }
       </Grid>
    )    
}

export default withStyles(SelectInterestsStyles)(SelectInterests)