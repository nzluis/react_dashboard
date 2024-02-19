import { useDispatch } from "react-redux"
import { data } from "../../data"
import { addPhoto } from "../../features/favouritesSlice"

export const AllPhotos = () => {
    const dispatch = useDispatch()
    function handleLike(e) {
        dispatch(addPhoto({
            id: e.target.dataset.info,
            src: e.target.src,
            description: e.target.alt
        }))
    }
    return (
        <>
            <h1>All</h1>
            {data.map((pic) => {
                return <img data-info={pic.id} key={pic.id} onClick={(e) => handleLike(e)} src={pic.urls.small} alt={pic.alt_description} />
            })}
        </>
    )
}