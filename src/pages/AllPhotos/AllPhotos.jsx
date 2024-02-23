import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import styles from './allPhotos.module.css'
import { CircularProgress } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { addPhoto } from "../../features/favourites/favouritesSlice"
import { searchPhotos, searchError, searchStatus, searchTerm } from "../../features/search/searchSlice"
import { getRandomSearchThunk, getTermSearchThunk } from "../../features/search/searchThunk"
import { useLocation } from "react-router-dom";
import { Header } from "../../components/Header/Header";

export const AllPhotos = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const allPhotos = useSelector(searchPhotos)
    const status = useSelector(searchStatus)
    const error = useSelector(searchError)
    const term = useSelector(searchTerm)
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

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
            <Header />
            <div className={styles.cards_container}>
                {!isLoading && allPhotos ? allPhotos.map((pic) => {
                    return (
                        <div key={pic.id} className={styles.card}>
                            <Zoom style={styles.img}>
                                <img
                                    src={pic.urls.regular}
                                    width={400}
                                    alt={pic.alt_description}
                                    loading="lazy"
                                />
                            </Zoom>
                            <AddCircleIcon fontSize="large" className={styles.addIcon} onClick={() => handleLike(pic)} />
                        </div>
                    )
                }) :
                    <CircularProgress />
                }
            </div >
        </>
    )
}