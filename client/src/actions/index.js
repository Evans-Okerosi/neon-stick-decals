// actions
export * from './images'
export *  from './upload'
export function login(){
    return{
        type:'LOGIN'
    }
}
export function logout(){
    return{
        type:'LOGOUT'
    }
}