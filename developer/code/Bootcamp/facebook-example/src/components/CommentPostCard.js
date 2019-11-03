/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-indent */
import React from 'react';
// import propTypes from 'prop-types';

function CommentPostCard({ comments }) {
  return comments.map(comment => {
    const { id, author, content } = comment;
    const { name, avatar } = author;

    return (
      <div key={id} className="comment-postcard">
        <div className="avatar_comment_postcard">
          <img src={avatar} alt="avatar_comment_postcard" />
        </div>

        <div className="container_comment_postcard">
          <span className="author_comment_postcard">
            <strong>{name}</strong>
          </span>
          &nbsp;&nbsp;
          <span className="content_comment_postcard">
            {content}
          </span>
        </div>
      </div>
    );
  });
}
/*
CommentPostCard.propTypes = {
  comments: propTypes.arrayOf(
    propTypes.shape({
      comment: propTypes.objectOf(
        propTypes.shape({
          id: propTypes,
          author: propTypes.objectOf(
            propTypes.shape({
              name: propTypes.string(),
              avatar: propTypes.string(),
            })
          ).isRequired,
          date: propTypes.date().isRequired,
          content: propTypes.string().isRequired,
          comments: propTypes.objectOf(
            propTypes.shape({
              id: propTypes.number().isRequired,
              author: propTypes.objectOf(
                propTypes.shape({
                  name: propTypes.string(),
                  avatar: propTypes.string(),
                })
              ).isRequired,
              content: propTypes.string().isRequired,
            })
          ),
        })
      ).isRequired,
    })
  ),
}; */

export default CommentPostCard;
