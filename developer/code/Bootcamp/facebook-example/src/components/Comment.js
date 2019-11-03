/* eslint-disable react/prop-types */
import React from 'react';
// import propTypes from 'prop-types';

function Comment({ author, content }) {
  const { name, avatar } = author;

  return (
    <div className="comment-postcard">
      <div className="avatar_comment_postcard">
        <img src={avatar} alt="avatar_comment_postcard" />
      </div>
      <div className="author_comment_postcard">
        <p>
          <strong>{name}</strong>
          {content}
        </p>
      </div>
    </div>
  );
}
/*
Comment.propTypes = {
  author: propTypes.objectOf(propTypes.object()).isRequired,
  content: propTypes.string().isRequired,
};
*/
export default Comment;
