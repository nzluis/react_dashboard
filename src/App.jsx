import { NavBar } from "./components/NavBar/NavBar"
import { AllPhotos } from "./components/AllPhotos/AllPhotos"
import { FavouritePhotos } from "./components/FavouritePhotos/FavouritePhotos"

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
