import { useSelector } from "react-redux"

export const FavouritePhotos = () => {
    const favourites = useSelector((state) => state.favourites)
    return (
        <>
            <h1>Favourites</h1>
            {favourites && favourites.map((favouritePic, index) => {
                return <img key={index} src={favouritePic.src} alt="" />
            })}
        </>
    )
}