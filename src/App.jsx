import { NavBar } from "./components/NavBar/NavBar"
import { AllPhotos } from "./pages/AllPhotos/AllPhotos"
import { FavouritePhotos } from "./pages/FavouritePhotos/FavouritePhotos"

function App() {
  return (
    <>
      <NavBar />
      <AllPhotos />
      <FavouritePhotos />
    </>
  )
}

export default App
