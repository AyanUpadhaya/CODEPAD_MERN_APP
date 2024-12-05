import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Layout from "../layout/Layout";
import NotFound from "../pages/notfound/NotFound";
import PostDetails from "../pages/post_details/PostDetails";
import AddPost from "../pages/add_post/AddPost";
import UpdatePost from "../pages/update_post/UpdatePost";
import Docs from "../pages/docs/Docs";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "/add_post",
        element: <AddPost></AddPost>,
      },
      {
        path: "/update_post",
        element: <UpdatePost></UpdatePost>,
      },
      {
        path: "/details",
        element: <PostDetails></PostDetails>,
      },
      {
        path: "/docs",
        element: <Docs></Docs>,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default routes;
