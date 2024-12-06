import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";
import NotifyContainer from "./utils/getNotify";
function App() {
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <NotifyContainer></NotifyContainer>
    </>
  );
}

export default App;
