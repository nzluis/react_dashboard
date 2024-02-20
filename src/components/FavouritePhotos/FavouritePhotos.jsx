import { useDispatch, useSelector } from "react-redux"
import { removePhoto } from "../../features/favouritesSlice"

export const FavouritePhotos = () => {
    const favourites = useSelector((state) => state.favourites)
    const dispatch = useDispatch()
    function handleClick(e) {
        dispatch(removePhoto(e.target.dataset.id))
    }
    return (
        <>
            <h1>Favourites</h1>
            {favourites && favourites.map((favouritePic) => {
                return (
                    <div key={favouritePic.id} style={{ display: 'inline' }}>
                        <img
                            onClick={(e) => handleClick(e)}
                            src={favouritePic.src_preview}
                            alt={favouritePic.alt_description}
                            data-id={favouritePic.id}
                        />
                    </div>
                )
            })}
        </>
    )
}