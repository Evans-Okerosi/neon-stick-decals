export const interestButtonStyle = theme => ({
  image:{
    backgroundRepeat:'no-repeat',
    backgroundPosition: 'center',
    margin: theme.spacing.unit,
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    
  },
  overlay:{
    background:'rgba(0,0,0,0.5)',
    width:'100%',
    height:200,
    
    transition: theme.transitions.create('background'),
    '&:hover':{
       background:'rgba(0,0,0,0.2)',
    }
  },
  focusVisible:{},
  title:{
     position:'absolute',
     fontSize: theme.typography.fontSize * 2,
     color:'#fff',
     width:'40%',
     '&:hover':{
       border:'4px solid white'
     },
      '&:after':{
        content:'""',
        position:'absolute',
        left:'30%',
        bottom:0,
        borderBottom:'2px solid white',
        width:'40%'
      }
  }
})

export const interestsStyle = theme =>({
  root:{
    marginTop:'4em'
  }
})
