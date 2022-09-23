export const initialData = {
  boards: [
    {
      id: "board-1",
      columnOrder: ["column-1", "column-2", "column-3"],
      columns: [
        {
          id: "column-1",
          boardId: "board-1",
          title: "To do column",
          taskOrder: [
            "task-1",
            "task-2",
            "task-3",
            "task-4",
            "task-5",
            "task-6",
            "task-7",
          ],
          tasks: [
            {
              id: "task-1",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of task 1",
              cover:
                "https://images.unsplash.com/photo-1663335468790-cf7e8a1e0e73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80",
            },
            {
              id: "task-2",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of task 2",
              cover:
                "https://images.unsplash.com/photo-1663335468790-cf7e8a1e0e73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80",
            },
            {
              id: "task-3",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of task 3",
              cover: null,
            },
            {
              id: "task-4",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of task 4",
              cover: null,
            },
            {
              id: "task-5",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of task 5",
              cover: null,
            },
            {
              id: "task-6",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of task 6",
              cover: null,
            },
            {
              id: "task-7",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of task 7",
              cover: null,
            },
          ],
        },
        {
          id: "column-2",
          boardId: "board-1",
          title: "Inprogress column",
          taskOrder: ["task-8", "task-9", "task-10"],
          tasks: [
            {
              id: "task-8",
              boardId: "board-1",
              columnId: "column-2",
              title: "Title of task 8",
              cover: null,
            },
            {
              id: "task-9",
              boardId: "board-1",
              columnId: "column-2",
              title: "Title of task 9",
              cover: null,
            },
            {
              id: "task-10",
              boardId: "board-1",
              columnId: "column-2",
              title: "Title of task 10",
              cover: null,
            },
          ],
        },
        {
          id: "column-3",
          boardId: "board-1",
          title: "Done column",
          taskOrder: ["task-11", "task-12", "task-13"],
          tasks: [
            {
              id: "task-11",
              boardId: "board-1",
              columnId: "column-3",
              title: "Title of task 11",
              cover: null,
            },
            {
              id: "task-12",
              boardId: "board-1",
              columnId: "column-3",
              title: "Title of task 12",
              cover: null,
            },
            {
              id: "task-13",
              boardId: "board-1",
              columnId: "column-3",
              title: "Title of task 13",
              cover: null,
            },
          ],
        },
      ],
    },
  ],
};
