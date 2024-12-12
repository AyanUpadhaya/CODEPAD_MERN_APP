import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";
import NotifyContainer from "./utils/getNotify";
import PostContextProvider from "./context/PostContextProvider";
import NoInternetConnection from "./utils/NoInternetConnection";

function App() {
  return (
    <>
      <PostContextProvider>
        <NoInternetConnection>
          <RouterProvider router={routes}></RouterProvider>
          <NotifyContainer></NotifyContainer>
        </NoInternetConnection>
      </PostContextProvider>
    </>
  );
}

export default App;
