 const styles = theme=>({
    container:{
     position:"relative",
     marginTop:'3em',
    },
   image:{
       minWidth:350,
       height: 0,
       paddingTop: '56.25%',
   },
   text:{
     
   },
   textCard:{
       position: "absolute",
       top: "80%",
       left:20,
       width:'90%',
       paddingBottom:0,
       marginBottom:0
   },
   cardContent:{
       paddingBottom:8
   },
   button:{
       color: 'darkred',
       background: 'rgba(039,0,0,0.1)'
   },
   pricing:{
       display:'flex',
       width:'100%',
   },
   priceLabel:{
      color: theme.palette.primary.main,
   },
   price:{
     color: 'darkred'
   }
}
)
 
 export const SelectInterestsStyles = {
    root:{
        marginTop:"3em"
    }
}




export default styles