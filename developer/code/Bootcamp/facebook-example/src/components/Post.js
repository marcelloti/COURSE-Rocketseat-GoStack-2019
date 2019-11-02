import React, { Component } from 'react';
import propTypes from 'prop-types';
import Commentpostcard from './CommentPostCard';

function Post({ post }) {
  const { id, author, date, content, comments } = post;
  const { name, avatar } = author;

  return (
    <div className="postcard center">
      <div className="header_postcard">
        <div className="avatar_postcard">
          <img src={avatar} alt="avatar-post-card"/>
        </div>
        <div className="author_postcard">
          <div className="author_postcard_name">{name}</div>
          <div className="author_postcard_date">{date}</div>
        </div>
      </div>
      <br/>
      <div className="content-postcard">
        <p>{content}</p>
      </div>
      <hr />
      <div className="comments-postcard">
        <Commentpostcard comments={comments} />
      </div>
    </div>
  )
}

export default Post;