// import { useQuery } from "react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import { IntroTodo } from "./components/IntroTodo";
import { TodoUI } from "./components/TodoUI";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// type TTods = {
//   title: string;
// };
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <IntroTodo />
        <Outlet />
      </div>
    ),
    // children: [
    //   {
    //     path: "/todos",
    //     element: <TodoUI />,
    //   },
    // ],
  },

  {
    path: "/todos",
    element: (
      <div>
        <TodoUI />
      </div>
    ),
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
