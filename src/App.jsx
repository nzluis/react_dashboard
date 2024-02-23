import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { AllPhotos } from "./pages/AllPhotos/AllPhotos"
import { FavouritePhotos } from "./pages/FavouritePhotos/FavouritePhotos"
import { Root } from "./pages/Root/index";

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />}>
    <Route path='/' element={<AllPhotos />} />
    <Route path='/myphotos' element={<FavouritePhotos />} />
  </Route>
));

export default function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}