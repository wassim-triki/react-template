// src/store/postStore.js
import { create } from 'zustand';
import { fetchPosts, createPost, deletePost } from '../services/posts';
import { persist } from 'zustand/middleware';
import { postsValidationMiddleware } from './postsValidationMiddleware';

// Not using persist here
// export const usePostStore = create((set, get) => ({
//   posts: [],

//   // load all posts into state
//   loadPosts: async () => {
//     const data = await fetchPosts();
//     set({ posts: data });
//   },

//   // add a new post then append it
//   addPost: async (post) => {
//     const newPost = await createPost(post);
//     set((state) => ({ posts: [...state.posts, newPost] }));
//   },

//   // remove it locally (after server deletion)
//   removePost: async (id) => {
//     await deletePost(id);
//     set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));
//   },
// }));

// Using Zustand with persist middleware to store posts in localStorage
export const usePostStore = create(
  postsValidationMiddleware(
    persist(
      (set, get) => ({
        posts: [],
        errors: '',

        // on load, try server → else leave whatever was rehydrated
        loadPosts: async () => {
          try {
            const data = await fetchPosts();
            set({ posts: data });
          } catch (err) {
            set({ errors: err });
          }
        },

        // on add, try server → else generate temp ID
        addPost: async (post) => {
          set((state) => ({ posts: [...state.posts, post] }));
        },

        removePost: async (id) => {
          set((state) => ({
            posts: state.posts.filter((p) => p.id !== id),
          }));
        },
      }),
      {
        name: 'post-storage', // localStorage key
        getStorage: () => localStorage, // could swap to sessionStorage here
      }
    )
  )
);
