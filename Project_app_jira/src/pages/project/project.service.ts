import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Project {
  id: number | string;
  name: string;
  description: string;
  // other fields...
}

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337" }),
  tagTypes: ["Project"],
  endpoints: (build) => ({
    getAllProject: build.query<Project[], void>({
      query: () => "/project",
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Project" as const,
                id,
              })),
              "Project",
            ]
          : ["Project"],
    }),

    addProject: build.mutation<Project, Partial<Project>>({
      query(body) {
        return {
          url: "/project",
          method: "POST",
          body,
        };
      },
    }),

    getOneProject: build.query<Project, string>({
      query: (id) => `project/${id}`,
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),

    updateProject: build.mutation<Project, Partial<Project>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/project/${id}`,
          method: "PUT",
          body,
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: "Project", id }],
    }),

    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/project/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: "Project", id }],
    }),
  }),
});

export const {
  useGetAllProjectQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useGetOneProjectQuery,
  useDeletePostMutation,
} = projectApi;
