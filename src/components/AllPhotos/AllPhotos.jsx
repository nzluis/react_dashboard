import { useDispatch } from "react-redux"
import { data } from "../../data"
// import { data_ } from "../../data2"
import { addPhoto } from "../../features/favourites/favouritesSlice"
import { useEffect, useState } from "react"
import { CircularProgress, Input } from "@mui/material"
import styles from './allPhotos.module.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export const AllPhotos = () => {
    const dispatch = useDispatch()
    const [allPhotos, setAllPhotos] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {

    //     const fetchPhotos = async () => {
    //         const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${import.meta.env.VITE_CLIENT_ID}&count=30&orientation=landscape`)
    //         if (!response.ok) throw new Error('Server responds a ' + response.status + ' status code')
    //         const photosData = await response.json()
    //         setAllPhotos(photosData)
    //         setIsLoading(false)

    //     }
    //     try {
    //         fetchPhotos()

    //     } catch (error) {
    //         throw new Error('Fetch problem by error: ' + error)
    //     }
    // }, [])


    function handleLike(pic) {
        dispatch(addPhoto({
            id: pic.id,
            src_preview: pic.urls.small,
            src_regular: pic.urls.regular,
            src_full: pic.urls.full,
            alt_description: pic.alt,
            description: pic.description,
            width: pic.width,
            height: pic.height,
            likes: pic.likes,
            created_at: new Date(Date.now()).toLocaleDateString("es-ES"),
        }))
    }
    return (
        <>
            <h1>All</h1>
            <form
            // onSubmit={handleSubmit}
            >
                <Input
                // value={searchInput}
                // onChange={(e) => { setSearchInput(e.target.value) }}
                />
                <button style={{ display: 'none' }} type="submit"></button>
            </form>
            <div className={styles.container}>
                {!isLoading ? data.map((pic) => {
                    return (
                        <div key={pic.id}>
                            <Zoom style={styles.img}>
                                <img
                                    src={pic.urls.regular}
                                    width={400}
                                    alt={pic.alt_description}
                                    loading="lazy"
                                />
                            </Zoom>
                            <AddCircleIcon onClick={() => handleLike(pic)} />
                        </div>
                    )
                }) :
                    <CircularProgress />
                    // <h1>Loading...</h1>
                }
            </div>
        </>
    )
}