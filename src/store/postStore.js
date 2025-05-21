// src/store/postStore.js
import { create } from 'zustand';
import { fetchPosts, createPost, deletePost } from '../services/posts';

export const usePostStore = create((set, get) => ({
  posts: [],

  // load all posts into state
  loadPosts: async () => {
    const data = await fetchPosts();
    set({ posts: data });
  },

  // add a new post then append it
  addPost: async (post) => {
    const newPost = await createPost(post);
    set((state) => ({ posts: [...state.posts, newPost] }));
  },

  // remove it locally (after server deletion)
  removePost: async (id) => {
    await deletePost(id);
    set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));
  },
}));
