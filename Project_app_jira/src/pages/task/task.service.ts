import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITask } from "../../types/Task";

type Props = {};

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337" }),
  tagTypes: ["Task"],
  endpoints: (build) => ({
    getAllTask: build.query<ITask[], any>({
      query: (params) => ({
        url: "/task",
        params,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.task.map(({ id }) => ({ type: "Task" as const, id })),
              "Task",
            ]
          : ["Task"],
    }),

    addTask: build.mutation<ITask, Partial<ITask>>({
      query(body) {
        return {
          url: "/task",
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result, error) => [{ type: "Task" }],
    }),

    getOneTask: build.query<ITask, string>({
      query: (id) => `task/${id}`,
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),

    updateTask: build.mutation<ITask, Partial<ITask>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/task/${id}`,
          method: "PUT",
          body,
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: "Task", id }],
    }),

    deleteTask: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `task/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Task", id }],
    }),

    updateTaskStatus: build.mutation<
      ITask,
      { taskId: string; newStatus: string }
    >({
      query(data) {
        const { taskId, newStatus } = data;
        return {
          url: `/task/${taskId}/status`,
          method: "PUT",
          body: { status: newStatus },
        };
      },
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Task", id: "taskId" },
      ],
    }),

    searchTaskByTitle: build.query({
      query: (title) => `/task/search/${title}`,
    }),
  }),
});

export const {
  useGetAllTaskQuery,
  useAddTaskMutation,
  useGetOneTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
  useSearchTaskByTitleQuery,
} = taskApi;
