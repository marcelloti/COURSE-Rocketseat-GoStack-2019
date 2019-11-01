import React, { Component } from 'react';
import Post from './components/Post';
import avatar1 from './assets/me.jpg';
import avatar2 from './assets/me.jpg';
import avatar3 from './assets/me.jpg';
import avatar4 from './assets/me.jpg';
import avatar5 from './assets/me.jpg';
import avatar6 from './assets/me.jpg';
import avatar7 from './assets/me.jpg';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Julio Alcantara",
          avatar: avatar1
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: avatar1
            },
            content: "Conteúdo do comentário"
          }
        ]
      }
    ]
  };

  render() {
    return (
      this.state.posts.map(post => <Post post={post}/>)
    )
  }  
}

export default PostList;