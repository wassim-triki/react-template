import React, { useEffect, useState } from 'react';
import { createPost, deletePost, fetchPosts } from '../services/posts';
import AddPostForm from '../components/AddPostForm';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    getPosts();
  }, []);

  const handlePostAdded = async () => {
    const data = await fetchPosts();
    setPosts(data);
  };

  const handleDeletePost = async (id) => {
    await deletePost(id);
    const data = await fetchPosts();
    setPosts(data);
  };

  return (
    <div>
      <h1>Posts</h1>
      <AddPostForm onPostAdded={handlePostAdded} />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}{' '}
            <button onClick={() => handleDeletePost(post.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
