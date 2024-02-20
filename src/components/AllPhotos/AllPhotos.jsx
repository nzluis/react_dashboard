import { useDispatch } from "react-redux"
import { data } from "../../data"
import { addPhoto } from "../../features/favouritesSlice"

export const AllPhotos = () => {
    const dispatch = useDispatch()
    function handleLike(e) {
        dispatch(addPhoto({
            id: e.target.dataset.id,
            src_preview: e.target.src,
            src_full: e.target.dataset.full,
            alt_description: e.target.alt,
            description: e.target.dataset.description,
            width: e.target.dataset.width,
            height: e.target.dataset.height,
            likes: e.target.dataset.likes,
            created_at: Date.now()
        }))
    }
    return (
        <>
            <h1>All</h1>
            {data.map((pic) => {
                return <img
                    key={pic.id}
                    onClick={(e) => handleLike(e)}
                    data-id={pic.id}
                    data-full={pic.urls.full}
                    data-width={pic.width}
                    data-height={pic.height}
                    data-description={pic.description}
                    data-likes={pic.likes}
                    src={pic.urls.small}
                    alt={pic.alt_description} />
            })}
        </>
    )
}