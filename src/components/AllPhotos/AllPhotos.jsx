import styles from './allPhotos.module.css'
import { CircularProgress } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { addPhoto, favouritePhotos } from "../../features/favourites/favouritesSlice"
import { useDispatch, useSelector } from 'react-redux';
import { searchPhotos, searchError, searchStatus, searchTerm } from "../../features/search/searchSlice"
import { getRandomSearchThunk, getTermSearchThunk } from "../../features/search/searchThunk"
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const AllPhotos = () => {
    const dispatch = useDispatch()
    const allPhotos = useSelector(searchPhotos)
    const favourites = useSelector(favouritePhotos)
    const [isLoading, setIsLoading] = useState(true)
    const status = useSelector(searchStatus)
    const error = useSelector(searchError)
    const term = useSelector(searchTerm)
    const notifySuccess = () => toast.success('Saved successfully');
    const notifyExist = () => toast.error('Already saved');

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
        if (!favourites.some(photo => photo.id === pic.id)) {
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
            notifySuccess()
        } else {
            notifyExist()
        }
    }

    return (
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
    )

}