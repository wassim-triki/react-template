// src/store/validationMiddleware.js
export const postsValidationMiddleware = (config) => (set, get, api) =>
  config(
    // our wrapped set:
    (args, replace) => {
      // derive what the next state would look like
      const nextState =
        typeof args === 'function'
          ? { ...get(), ...args(get()) }
          : { ...get(), ...args };

      // ⚠️ Example rule: posts must always be an array
      if (nextState.posts !== undefined && !Array.isArray(nextState.posts)) {
        console.error('Validation failed: `posts` must be an array.');
        return; // abort the set
      }

      // ⚠️ You could add more checks here:
      // if newState.posts.some(p => !p.title) { … }

      // if we passed validation, delegate to the real set
      set(args, replace);
    },
    get,
    api
  );
