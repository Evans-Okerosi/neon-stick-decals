import Home from 'views/Home/home.jsx';
import AdminUpload from 'views/AddSkin/adminUpload.jsx';
import IntermediateCart from 'views/Carts/intermediate.jsx';
import FinalCart from 'views/Carts/final.jsx';
import SignupPage from 'views/auth/signup.jsx';
import LoginPage from 'views/auth/login.jsx';
import Interests from 'views/Interests/Interests.jsx';
import Designs from 'views/Designs/designs.jsx';
const appRoutes = [
  { path: '/Designs/:filter', component: Designs },
  { path: '/Home', component: Home },
  { path: '/Interests', component: Interests },
  { path: '/AdminUpload', component: AdminUpload },
  { path: '/Cart', component: IntermediateCart },
  { path: '/FinalCart', component: FinalCart },
  { path: '/Login', component: LoginPage },
  { path: '/Signup', component: SignupPage },
  { redirect: true, to: '/Home' }
];

export default appRoutes;
