import React from 'react';
// import propTypes from 'prop-types';
import Commentpostcard from './CommentPostCard';

// eslint-disable-next-line react/prop-types
function Post({ data }) {
  // eslint-disable-next-line react/prop-types
  const { author, date, content, comments } = data;
  // eslint-disable-next-line react/prop-types
  const { name, avatar } = author;

  return (
    <div className="postcard center">
      <div className="header_postcard">
        <div className="avatar_postcard">
          <img src={avatar} alt="avatar-post-card" />
        </div>
        <div className="author_postcard">
          <div className="author_postcard_name">{name}</div>
          <div className="author_postcard_date">{date}</div>
        </div>
      </div>
      <br />
      <div className="content-postcard">
        <p>{content}</p>
      </div>
      <hr />
      <div className="comments-postcard">
        <Commentpostcard comments={comments} />
      </div>
    </div>
  );
}

/*
Post.propTypes = {
  author: propTypes.objectOf(
    propTypes.shape({
      name: propTypes.string(),
      avatar: propTypes.string(),
    })
  ).isRequired,
  data: propTypes.objectOf(
    propTypes.shape({
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
};
*/

export default Post;
