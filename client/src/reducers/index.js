import { combineReducers } from 'redux';
import {
  VIEW_IMAGE,
  RECEIVE_IMAGES,
  FETCH_IMAGES,
  INVALIDATE_IMAGES,
  FETCH_IMAGES_ERROR,
  SELECT_CATEGORY,
  ADD_TO_CART,
  BUY,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_FAILURE
} from 'actions';
import auth from 'utils/authenticate';
function authState(state = { loggedIn: auth.checkAuth() }, action) {
  if (action.type === 'LOGIN')
    return {
      loggedIn: true
    };
  else if (action.type === 'LOGOUT') {
    return {
      loggedIn: false
    };
  }
  return state;
}
function selectCategory(state = { category: 'all' }, action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return Object.assign({}, state, {
        cartegory: action.cartegory
      });
    default:
      return state;
  }
}

function images(
  state = {
    isFetching: false,
    images: null,
    category: 'all',
    currentPageNo: 1,
    imagesUserViewd: [],
    cart: [],
    bought: [],
    fetchImagesError: {}
  },
  action
) {
  switch (action.type) {
    case FETCH_IMAGES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_IMAGES:
      return Object.assign({}, state, {
        images: action.images,
        isFetching: false,
        receivedAt: action.receivedAt
      });
    case ADD_TO_CART:
      return Object.assign({}, state, {
        cart: [...state.cart, action.id]
      });
    case BUY:
      return Object.assign({}, state, {
        bought: [...state.bought, action.bought]
      });
    case VIEW_IMAGE:
      return Object.assign({}, state, {
        imagesUserViewed: [...state.imagesUserViewed, action.image]
      });
      case 'REMOVE_CART_ITEMS':
      return Object.assign({},state,{
        cart:[]
      })
    case FETCH_IMAGES_ERROR:
      return Object.assign({}, state, {
        fetchImagesError: action.error
      });
    /*case ADD_TO_CART:
         return Object.assign({}, state,{
           cart: state.cart.push(action.id)
         })*/
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  authState,
  selectCategory,
  images
});

export default rootReducer;
