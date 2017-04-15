import React, { PropTypes } from 'react';

// Import Components
import PostListItem from './PostListItem/PostListItem';

function PostList(props) {

  const handleOnVote = (e, cuid, voteCount, val) => {
    e.preventDefault();
    props.handleVoteClick(cuid, voteCount, val)
  }
  debugger;
  return (
    <div className="listView">
      {
        
        props.posts.map(post => (
          <PostListItem
            post={post}
            key={post.cuid}
            onDelete={() => props.handleDeletePost(post.cuid)}
            onVotePlus={ e => handleOnVote(e, post.cuid, post.voteCount, 1) }
            onVoteMinus={ e => handleOnVote(e, post.cuid, post.voteCount, -1) }
          />
        ))
      }
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleVoteClick: PropTypes.func.isRequired,
};

export default PostList;
