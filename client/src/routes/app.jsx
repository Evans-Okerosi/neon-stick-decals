
import Home from "views/Home/home.jsx"
import AdminUpload from "views/AddSkin/adminUpload.jsx"
import IntermediateCart from "views/Carts/intermediate.jsx"
import FinalCart from "views/Carts/final.jsx"
import SignupPage from "views/auth/signup.jsx"
import LoginPage from "views/auth/login.jsx"

const appRoutes = [
    { path: "/Home", component: Home },
    { path: "/AdminUpload", component: AdminUpload },
    { path: "/Cart", component: IntermediateCart },
    { path: "/FinalCart", component: FinalCart },
    { path: "/Login", component: LoginPage},
    { path: "/Signup", component: SignupPage},
    { redirect: true, to: "/Home", }
];


export default appRoutes;
