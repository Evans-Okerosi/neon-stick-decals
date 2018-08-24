class Authenticate{
    static authenticateUser(token){
        localStorage.setItem('token',token)
    }
    static checkAuth(){
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