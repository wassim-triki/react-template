// src/pages/Posts.jsx
import React, { useEffect } from 'react';
import AddPostForm from '../components/AddPostForm';
import { usePostStore } from '../store/postStore';

const Posts = () => {
  const { posts, loadPosts, removePost } = usePostStore();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div>
      <h1>Posts</h1>
      <AddPostForm />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}{' '}
            <button onClick={() => removePost(post.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
