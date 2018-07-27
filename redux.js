// actions
// Reducers

import { combineReducers } from 'redux';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECIEVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDIT = 'SELECT_SUBREDIT';
export const INVALIDATE_SUBREDIT = 'INVALIDATE_SUBREDIT';

export function selectSubredit(subredit) {
  return {
    type: SELECT_SUBREDIT,
    subredit
  };
}
export function invalidateSubredit(subredit) {
  return {
    type: INVALIDATE_SUBREDIT,
    subredit
  };
}
function requestPosts(subredit) {
  return {
    type: REQUEST_POSTS,
    subredit
  };
}
function receivePosts(subredit, json) {
  return {
    type: RECIEVE_POSTS,
    subredit,
    posts: json.data.children.map(child => child.data),
    recivedAt: Date.now()
  };
}
function fetchPosts(subredit) {
  return (dispatch) => {
    dispatch(requestPosts(subredit));
    return fetch(`https://www.reddit.com/r/${subredit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subredit, json)));
  };
}
function shouldFetchPosts(state, subredit) {
  const posts = state.postsBySubredit[subredit];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
}
export function fetchPostsIfNeeded(subredit) {
  if (shouldFetchPosts(getState(), subredit)) {
    return dispatch(fetchPosts(subredit));
  }
}

function selectedSubredit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDIT:
      return action.subredit;
    default:
      return state
  }
}
function posts(
    state = {
        isFetching: false,
        didInvalidate: false,
        items:[]
    },
    action
){
    switch (action.type) {
      case INVALIDATE_SUBREDIT:
        return Object.assign({}, state, {
          didInvalidate: true
        })
      case REQUEST_POSTS:
        return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false
        })
      case RECIEVE_POSTS:
        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          items: action.posts,
          lastUpdated: action.receivedAt
        })
      default:
        return state
    }
  }