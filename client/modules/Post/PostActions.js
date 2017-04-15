import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const VOTE_POST = 'VOTE_POST';

export function changeVoteCount(cuid, voteCount) {
  return {
    type: VOTE_POST,
    cuid,
    voteCount
  };
};

export function changeVoteCountRequest(cuid, voteCount) {
  console.log(voteCount);
  return (dispatch) => {
    return callApi(`posts/${cuid}/${voteCount}`, 'put')
      .then(res => dispatch(changeVoteCount(cuid, voteCount)));
  };
};

export function editPost(cuid, post) {
  return {
    type: EDIT_POST,
    cuid,
    post
  };
};

export function editPostRequest(cuid, post) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'put', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }).then(res => dispatch(editPost(cuid,post)));
  };
};

export function addPost(post) {
  debugger;
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    debugger;
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }).then(res => {
      debugger;
      dispatch(addPost(res.post))
    });
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}