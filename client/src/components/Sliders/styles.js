export const styles = theme=>({
    text:{
        position:'absolute',
        top:'50%',
        color:'white'
    },
    img: {
        display: "block",
        width: "100%",
        height: "auto"
      },
    imgContainer: {
      width:1626,
      height:650,
      background:`url(home)`
    },
    overlay:{
        width:"100%",
        height:650,
        zindex:-1,
        position:'absolute',
        top:0,
        background:"rgba(0,0,0,.4)"
    }
})