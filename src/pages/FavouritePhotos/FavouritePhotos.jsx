import { useDispatch, useSelector } from "react-redux"
import { removePhoto } from "../../features/favourites/favouritesSlice"
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styles from './favouritesPhotos.module.css'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ModalComponent } from "../../components/Modal/ModalComponent";
import { Header } from "../../components/Header/Header";

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
    const [selectedPic, setSelectedPic] = useState({})
    const [orderBy, setOrderBy] = useState('')
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const filterBySearch = getOrderedPhotos(getFilteredPhotos(favourites, term), orderBy)
    const { pathname } = useLocation()

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
            <Header />
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