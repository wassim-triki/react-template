import React, { useEffect, useState } from 'react';
import { createPost, deletePost, fetchPosts } from '../services/posts';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    getPosts();
  }, []);

  const handleAddPost = async () => {
    const newPost = {
      title: 'Nouveau post',
      content: 'Contenu du nouveau post',
    };
    await createPost(newPost);
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
      <button onClick={handleAddPost}>Ajouter un post</button>
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
