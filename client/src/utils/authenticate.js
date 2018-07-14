class Authenticate{
    static authenticateUser(token){
        localStorage.setItem('token',token)
    }
    static checkAuthentication(){
        if(!localStorage.getItem('token')){
            return null
        }
        return true
    }
    static deauthenticate(){
        localStorage.removeItem('token')
    }
}
export default Authenticate