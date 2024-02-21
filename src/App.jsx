import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { AllPhotos } from "./pages/AllPhotos/AllPhotos"
import { FavouritePhotos } from "./pages/FavouritePhotos/FavouritePhotos"
import { NavBar } from './components/NavBar/NavBar'

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<NavBar />}>
    <Route path='/' element={<AllPhotos />} />
    <Route path='/myphotos' element={<FavouritePhotos />} />
  </Route>
));

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App

// export default function App() {
//   return (
//     <>
//       <NavBar />
//       <AllPhotos />
//       <FavouritePhotos />
//     </>
//   )
// }

