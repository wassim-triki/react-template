// src/store/postStore.js
import { create } from 'zustand';
import { fetchPosts, createPost, deletePost } from '../services/posts';
import { persist } from 'zustand/middleware';
import { postsValidationMiddleware } from './postsValidationMiddleware';
import { useAuthStore } from './authStore';

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
      (set) => ({
        posts: [],
        errors: '',

        loadPosts: async () => {
          try {
            const data = await fetchPosts();
            set({ posts: data, errors: '' });
          } catch (err) {
            set({ errors: err.message });
          }
        },

        addPost: (post) => {
          const withId = { id: Date.now(), ...post };
          set((s) => ({ posts: [...s.posts, withId] }));
        },

        removePost: (id) => {
          set((s) => ({ posts: s.posts.filter((p) => p.id !== id) }));
        },
      }),
      {
        name: 'post-storage',
        getStorage: () => localStorage,
        partialize: (state) => ({ posts: state.posts }),
      }
    )
  )
);

// only clear on logout
useAuthStore.subscribe(
  (s) => s.user,
  (newUser, oldUser) => {
    if (!newUser && oldUser) {
      usePostStore.setState({ posts: [], errors: '' });
    }
  }
);
