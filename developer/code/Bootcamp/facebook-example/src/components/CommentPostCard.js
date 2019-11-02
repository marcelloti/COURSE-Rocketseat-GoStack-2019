import React, { Component } from 'react';

function CommentPostCard({comments}) {
  return (
    comments.map(comment => {
      let { id, author, content } = comment;
      let { name, avatar } = author;

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
    })
  );
}

export default CommentPostCard;