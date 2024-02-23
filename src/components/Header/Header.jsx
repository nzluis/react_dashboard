import { useState } from "react"
import styles from "./header.module.css"
import { addMyPhotosTerm } from "../../features/favourites/favouritesSlice"
import { useMediaQuery } from 'react-responsive'
import { useLocation } from "react-router-dom"
import { addTerm, getReadyNewRequest } from "../../features/search/searchSlice"
import { useDispatch } from "react-redux"


export const Header = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1000px)'
    })
    const dispatch = useDispatch()
    const [searchInput, setSearchInput] = useState('')

    const { pathname } = useLocation()
    const root = pathname === '/'

    function allPhotos_handleSubmit(e) {
        e.preventDefault()
        dispatch(getReadyNewRequest())
        dispatch(addTerm(searchInput))
        setSearchInput('')
    }

    function favouritePhotos_handleSubmit(e) {
        e.preventDefault()
        dispatch(addMyPhotosTerm(searchInput))
        setSearchInput('')
    }
    const backgroundAll = "https://images.unsplash.com/photo-1508995561846-e758be1cf510?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const backgroundFavourites = "https://images.unsplash.com/photo-1432839318976-b5c5785ce43f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    return (
        <>
            {isDesktopOrLaptop && <div className={styles.container} style={{
                backgroundImage: `url(${root ? backgroundAll : backgroundFavourites})`
            }}>
                <div className={styles.first_column}>
                    <form className={styles.form} onSubmit={(e) => root ? allPhotos_handleSubmit(e) : favouritePhotos_handleSubmit(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                            placeholder={root ? "LOOK FOR A PICTURE..." : "SEARCH ON YOUR PHOTOS..."}
                            className={styles.input}
                            value={searchInput}
                            onChange={(e) => { setSearchInput(e.target.value) }}
                        />
                        <button style={{ display: 'none' }} type="submit"></button>
                    </form>
                    <h1 className={styles.h1}>FIND YOUR VISION</h1>
                </div>
                <div className={styles.second_column}>
                    <h2 className={styles.h2}>{root ? 'BEST FREE PICTURES ON INTERNET' : 'YOUR LOCAL PHOTO STORAGE'}</h2>
                    <h3 className={styles.h3}>{root ? 'All kind of images shared by their creators' : 'Manage all your favourite photos as you wish'}</h3>
                </div>
            </div>}
        </>

    )
}