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
      <div className="container mx-auto">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
