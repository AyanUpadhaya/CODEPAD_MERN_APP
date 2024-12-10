import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";
import NotifyContainer from "./utils/getNotify";
import PostProvider from "./context/PostContext";
import NoInternetConnection from "./utils/NoInternetConnection";

function App() {
  return (
    <>
      <PostProvider>
        <NoInternetConnection>
          <RouterProvider router={routes}></RouterProvider>
          <NotifyContainer></NotifyContainer>
        </NoInternetConnection>
      </PostProvider>
    </>
  );
}

export default App;
