import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import styles from './allPhotos.module.css'
import { CircularProgress, Input } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { addPhoto } from "../../features/favourites/favouritesSlice"
import { addTerm, getReadyNewRequest, searchPhotos, searchError, searchStatus, searchTerm } from "../../features/search/searchSlice"
import { getRandomSearchThunk, getTermSearchThunk } from "../../features/search/searchThunk"

export const AllPhotos = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [searchInput, setSearchInput] = useState('')
    const allPhotos = useSelector(searchPhotos)
    const status = useSelector(searchStatus)
    const error = useSelector(searchError)
    const term = useSelector(searchTerm)

    useEffect(() => {
        if (term !== '') {
            if (status === 'idle') {
                dispatch(getTermSearchThunk(term))
            } else if (status === 'pending') {
                setIsLoading(true)
            } else if (status === 'fulfilled') {
                setIsLoading(false)
            }
        } else if (term === '') {
            if (status === 'idle') {
                dispatch(getRandomSearchThunk())
            } else if (status === 'pending') {
                setIsLoading(true)
            } else if (status === 'fulfilled') {
                setIsLoading(false)
            }
        } else {
            alert(`Sorry, there was an error: ${error}`)
        }


    }, [dispatch, allPhotos, status, term, error])

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getReadyNewRequest())
        dispatch(addTerm(searchInput))
        setSearchInput('')
    }

    function handleLike(pic) {
        dispatch(addPhoto({
            id: pic.id,
            src_preview: pic.urls.small,
            src_regular: pic.urls.regular,
            src_full: pic.urls.full,
            alt_description: pic.alt,
            description: pic.description || '',
            width: pic.width,
            height: pic.height,
            likes: pic.likes,
            created_at: new Date(Date.now()).toLocaleDateString("es-ES"),
        }))
    }
    return (
        <>
            <h1>All</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Input
                    value={searchInput}
                    onChange={(e) => { setSearchInput(e.target.value) }}
                />
            </form>
            <div className={styles.container}>
                {!isLoading && allPhotos ? allPhotos.map((pic) => {
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
                }
            </div >
        </>
    )
}