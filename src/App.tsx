import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Germany from "@/views/Germany";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Germany />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
