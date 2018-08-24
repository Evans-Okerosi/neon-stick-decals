import grey from '@material-ui/core/colors/grey'; 
export const styles= theme=>({
    paper:{
        display:'flex',
        width:'100%',
        justifyContent:'center',
        alignContent:'center'
    },
    root:{
        marginTop:'5em',
        width:'100%',
        display:'flex',
        justifyContent:'center',
    },
    input:{
        background: grey[200],
        width:'70%'
    },
    inputContainer:{
        width:'100%'
    }
})