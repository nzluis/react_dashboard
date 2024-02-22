import { useDispatch, useSelector } from "react-redux"
import { removePhoto, addMyPhotosTerm } from "../../features/favourites/favouritesSlice"
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styles from './favouritesPhotos.module.css'
import { useMediaQuery } from 'react-responsive'


import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ModalComponent } from "../../components/Modal/ModalComponent";

function getFilteredPhotos(photos, searchTerm) {
    return photos.filter(photo => photo.description.toLowerCase().includes(searchTerm.toLowerCase()));
}

function getOrderedPhotos(photos, filter) {
    if (filter === 'newer') return photos.sort((prevPhoto, nextPhoto) => nextPhoto['created_at'] - prevPhoto['created_at']).reverse()
    return photos.sort((prevPhoto, nextPhoto) => nextPhoto[filter] - prevPhoto[filter])
}

export const FavouritePhotos = () => {

    const favourites = useSelector((state) => state.favourites.photos)
    const term = useSelector((state) => state.favourites.term)
    const dispatch = useDispatch()

    const [selectedPic, setSelectedPic] = useState({})
    const [orderBy, setOrderBy] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [open, setOpen] = useState(false);



    const filterBySearch = getOrderedPhotos(getFilteredPhotos(favourites, term), orderBy)
    const { pathname } = useLocation()
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1000px)'
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])


    useEffect(() => {
        localStorage.setItem('favouritePhotos', JSON.stringify(favourites))
    }, [favourites])



    function handleModal(photo) {
        setSelectedPic(photo)
        setOpen(true)
    }

    return (
        <>
            {isDesktopOrLaptop && <div className={styles.container}>
                <div className={styles.first_column}>
                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                            placeholder="SEARCH ON YOUR PHOTOS..."
                            className={styles.input}
                            value={searchInput}
                            onChange={(e) => { setSearchInput(e.target.value) }}
                            onKeyDown={(e) => e.key === 'Enter' && dispatch(addMyPhotosTerm(searchInput)) && setSearchInput('')}
                        />
                        <button style={{ display: 'none' }} type="submit"></button>
                    </form>
                    <h1 className={styles.h1}>FIND YOUR VISION</h1>
                </div>
                <div className={styles.second_column}>
                    <h2 className={styles.h2}>YOUR LOCAL PHOTO STORAGE</h2>
                    <h3 className={styles.h3}>Manage all your favourite photos as you wish</h3>
                </div>
            </div>}
            <div className={styles.cards_container}>
                <FormControl fullWidth >
                    <InputLabel className={styles.select} id="orderby">Order by</InputLabel>
                    <Select className={styles.select}
                        labelId="orderby"
                        id="selectOrder"
                        value={orderBy}
                        label="Order by"
                        onChange={(e) => setOrderBy(e.target.value)}
                    >
                        <MenuItem value="created_at">Older</MenuItem>
                        <MenuItem value="newer">Newer</MenuItem>
                        <MenuItem value="width">Width</MenuItem>
                        <MenuItem value="height">Height</MenuItem>
                        <MenuItem value="likes">Likes</MenuItem>
                    </Select>
                </FormControl>
                {filterBySearch && filterBySearch.map((favouritePic) => {
                    return (
                        <div className={styles.card} key={favouritePic.id} >
                            <Zoom>
                                <img
                                    src={favouritePic.src_regular}
                                    alt={favouritePic.alt_description}
                                    width={400}
                                />
                            </Zoom>
                            <InfoIcon className={styles.infoIcon} fontSize="large" onClick={() => handleModal(favouritePic)} />
                            <RemoveCircleIcon className={styles.removeIcon} fontSize="large" onClick={() => dispatch(removePhoto(favouritePic.id))} />
                        </div>
                    )
                })}
            </div>
            <ModalComponent favourites={favourites} open={open} setOpen={setOpen} selectedPic={selectedPic} />
        </>
    )
}