import { useDispatch, useSelector } from "react-redux"
import { removePhoto } from "../../features/favouritesSlice"

export const FavouritePhotos = () => {
    const favourites = useSelector((state) => state.favourites)
    const dispatch = useDispatch()
    function handleClick(e) {
        dispatch(removePhoto(e.target.alt))
    }
    return (
        <>
            <h1>Favourites</h1>
            {favourites && favourites.map((favouritePic) => {
                return <img key={favouritePic.id} onClick={(e) => handleClick(e)} src={favouritePic.src} alt={favouritePic.id} />
            })}
        </>
    )
}