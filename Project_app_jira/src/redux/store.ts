import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../pages/project/project.slice";
import { projectApi } from "../pages/project/project.service";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { taskApi } from "../pages/task/task.service";
import { signupApi } from "../pages/signup.service";
import { signinApi } from "../pages/Signin.service";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [signupApi.reducerPath]: signupApi.reducer,
    [signinApi.reducerPath]: signinApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      projectApi.middleware,
      taskApi.middleware,
      signupApi.middleware,
      signinApi.middleware,
    ]),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
