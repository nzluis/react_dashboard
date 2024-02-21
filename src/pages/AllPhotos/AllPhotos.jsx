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
import { Header } from "../../components/Header/Header";
import { useLocation } from "react-router-dom";

export const AllPhotos = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [searchInput, setSearchInput] = useState('')
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
            <div className={styles.container}>
                <div className={styles.first_column}>
                    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                            placeholder="LOOK FOR A PICTURE..."
                            className={styles.input}
                            value={searchInput}
                            onChange={(e) => { setSearchInput(e.target.value) }}
                        />
                        <button style={{ display: 'none' }} type="submit"></button>
                    </form>
                    <h1 className={styles.h1}>FIND YOUR VISION</h1>
                </div>
                <div className={styles.second_column}>
                    <h2 className={styles.h2}>BEST FREE PICTURES ON INTERNET</h2>
                    <h3 className={styles.h3}>All kind of images shared by their creators</h3>
                </div>
            </div>
            <div className={styles.cards_container}>
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