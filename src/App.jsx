import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { Root } from "./pages/Root/index";
import { Home } from "./pages/Home/Home";
import { MyPhotos } from "./pages/MyPhotos/MyPhotos";

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route element={<Root />}>
    <Route path='/' element={<Home />} />
    <Route path='/myphotos' element={<MyPhotos />} />
  </Route>
));

export default function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}