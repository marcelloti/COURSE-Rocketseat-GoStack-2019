import React, { Component } from 'react';
import propTypes from 'prop-types';

function Comment({ id, author, content }) {
  const { name, avatar } = author;
  return (
          <div class="comment-postcard">
            <div class="avatar_comment_postcard">
              <img src={avatar} alt="avatar_comment_postcard"/>
            </div>
            <div class="author_comment_postcard">
              <p>
                <strong>{name}</strong>
                {content}
              </p>
            </div>
          </div>
  );
}

export default Comment;