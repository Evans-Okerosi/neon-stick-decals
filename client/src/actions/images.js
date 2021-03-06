import axios from 'axios';

export const VIEW_IMAGE = 'VIEW_IMAGE';
export const FETCH_IMAGES_ERROR = 'FETCH_IMAGES_ERROR';
export const FETCH_IMAGES = 'FETCH_IMAGES';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const INVALIDATE_IMAGES = 'INVALIDATE_IMAGES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const BUY = 'BUY';
export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_IMAGE_DETAILS = 'GET_IMAGE_DETAILS';
export const RECEIVE_IMAGE_DETAILS = 'RECEIVE_IMAGE_DETAILS';
export const RECEIVE_IMAGE_DETAILS_ERROR = 'RECEIVE_IMAGE_DETAILS_ERROR';
export const REMOVE_CART_ITEMS = "REMOVE_CART_ITEMS"

// credentials
const APP_ACCESS_KEY =
  'cb9bed1bac0d0f1420c9146fe52a17c250ee98951ed0f7b85072044e6b0af009';

function getImageDetails(id) {
  return {
    type: GET_IMAGE_DETAILS,
    id
  };
}
export function removeCartItems(){
  return{
    type:REMOVE_CART_ITEMS
  }
}

function receiveImageDetailsError(error) {
  return {
    type: RECEIVE_IMAGE_DETAILS_ERROR,
    error
  };
}
function receiveImageDetails(data) {
  return {
    type: RECEIVE_IMAGE_DETAILS,
    data
  };
}
export function buy(skin) {
  return {
    type: BUY,
    skin
  };
}

export function addToCart(id) {
  return {
    type: ADD_TO_CART,
    id
  };
}

export function imageDetails(id) {
  return function(dispatch) {
    dispatch(getImageDetails(id));
    axios
      .get(`https://api.unsplash.com/photos/${id}`, {
        headers: { Authorization: `Client-ID ${APP_ACCESS_KEY}` }
      })
      .then(
        res => {
          dispatch(receiveImageDetails(res.data));
        },
        err => {
          receiveImageDetailsError(err);
        }
      );
  };
}

function fetchImages(categories) {
  return {
    type: FETCH_IMAGES,
    categories
  };
}
function fetchImagesError(error) {
  return {
    type: FETCH_IMAGES_ERROR,
    error
  };
}

function receiveImages(json) {
  return {
    type: RECEIVE_IMAGES,
    images: json,
    receivedAt: Date.now()
  };
}
export function invalidateImages(id) {
  return {
    type: INVALIDATE_IMAGES,
    id
  };
}

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  };
}

export function requestImages(categories = 'none', username) {
  return function(dispatch) {
    dispatch(fetchImages(categories));

    // define endpoint url for image requests
    const defineEndpoint = () => {
      if (categories === 'none') {
        return {
          endPoint: '/photos/curated',
          params: {
            page: 3,
            per_page: 30,
            order_by: 'popular'
          }
        };
      }
      if (username) {
        return {
          endPoint: `/users/:${username}/photos`,
          params: {}
        };
      }
      return {
        endPoint: '/search/photos',
        params: {
          query: categories,
          page: 3,
          per_page: 30,
          orientation: 'squarish'
        }
      };
    };
    return (
      axios
        // send access key with request
        .get(`https://api.unsplash.com${defineEndpoint().endPoint}`, {
          params: {
            ...defineEndpoint().params
          },
          headers: { Authorization: `Client-ID ${APP_ACCESS_KEY}` }
        })
        .then(
          res => {
            // update app state
            dispatch(receiveImages(res.data));
          },
          // Do not use catch, because that will also catch
          // any errors in the dispatch and resulting render,
          // causing a loop of 'Unexpected batch number' errors.
          // https://github.com/facebook/react/issues/6895
          error => {
            dispatch(fetchImagesError(error));
          }
        )
    );
  };
}
