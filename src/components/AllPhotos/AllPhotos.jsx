import { useDispatch } from "react-redux"
// import { data } from "../../data"
// import { data_ } from "../../data2"
import { addPhoto } from "../../features/favouritesSlice"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"

export const AllPhotos = () => {
    const dispatch = useDispatch()
    const [allPhotos, setAllPhotos] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPhotos = async () => {
            const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${import.meta.env.VITE_CLIENT_ID}&count=30&orientation=landscape`)
            if (!response.ok) throw new Error('Server responds an ' + response.status + ' status code')
            const photosData = await response.json()
            setAllPhotos(photosData)
            setIsLoading(false)
        }
        fetchPhotos()
    }, [])


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
            created_at: Date.now(),
            download: e.target.dataset.download
        }))
    }
    return (
        <>
            <h1>All</h1>
            {!isLoading ? allPhotos.map((pic) => {
                return <img
                    key={pic.id}
                    onClick={(e) => handleLike(e)}
                    data-id={pic.id}
                    data-full={pic.urls.full}
                    data-width={pic.width}
                    data-height={pic.height}
                    data-description={pic.description}
                    data-likes={pic.likes}
                    data-download={pic.links.download}
                    src={pic.urls.small}
                    alt={pic.alt_description}
                />
            }) :
                <CircularProgress />
                // <h1>Loading...</h1>
            }
        </>
    )
}