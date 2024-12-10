import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";
import NotifyContainer from "./utils/getNotify";
import PostProvider from "./context/PostContext";

function App() {
  return (
    <>
      <PostProvider>
        <RouterProvider router={routes}></RouterProvider>
        <NotifyContainer></NotifyContainer>
      </PostProvider>
    </>
  );
}

export default App;
