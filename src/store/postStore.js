// src/store/postStore.js
import { create } from 'zustand';
import { fetchPosts, createPost, deletePost } from '../services/posts';
import { persist } from 'zustand/middleware';

// Not using persist here
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

// Using Zustand with persist middleware to store posts in localStorage
// export const usePostStore = create(
//   persist(
//     (set, get) => ({
//       posts: [],

//       loadPosts: async () => {
//         const data = await fetchPosts();
//         set({ posts: data });
//       },

//       addPost: async (post) => {
//         const newPost = await createPost(post);
//         set((state) => ({ posts: [...state.posts, newPost] }));
//       },

//       removePost: async (id) => {
//         await deletePost(id);
//         set((state) => ({
//           posts: state.posts.filter((p) => p.id !== id),
//         }));
//       },
//     }),
//     {
//       name: 'post-storage',            // key in localStorage
//       getStorage: () => localStorage,  // (default) could be sessionStorage
//       // only persist the `posts` array, not functions
//       partialize: (state) => ({ posts: state.posts }),
//       // you can also hook into events like onRehydrateStorage if needed
//       // onRehydrateStorage: () => (state, error) => { ... }
//     }
//   )
// );
