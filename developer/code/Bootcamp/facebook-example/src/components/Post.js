import React, { Component } from 'react';
import propTypes from 'prop-types';

function Post({ id, author, date, content, comments }) {
  const { name, avatar } = author;
  return (
    <div class="postcard">
      <div class="header_postcard">
        <div class="avatar_postcard">
          <img src={avatar} alt="avatar-post-card"/>
        </div>
        <div class="author_postcard">
          <p>{name}</p>
          <p>date</p>
        </div>
      </div>
      <div class="content-postcard">
        <p>{content}</p>
      </div>
      <hr />
      <div class="comments-postcard">
        <commentPostCard />
      </div>
    </div>
  )
}

TechItem.defaultProps = {
  tech: 'Oculto'
};

TechItem.propTypes = {
  tech: propTypes.string,
  onDelete: propTypes.func.isRequired,
};

export default Post;