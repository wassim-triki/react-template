// src/pages/Posts.jsx
import React, { useEffect } from 'react';
import AddPostForm from '../components/AddPostForm';
import { usePostStore } from '../store/postStore';
import { useAuthStore } from '../store/authStore';

export default function Posts() {
  const user = useAuthStore((s) => s.user);
  const { posts, loadPosts, removePost, errors } = usePostStore();

  useEffect(() => {
    // only fetch from the server if we have a logged-in user
    // AND our cache is currently empty
    if (user && posts.length === 0) {
      loadPosts();
    }
  }, [user, posts.length, loadPosts]);

  return (
    <div>
      <h1>Posts</h1>
      {errors && <p style={{ color: 'red' }}>{errors}</p>}

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
}
