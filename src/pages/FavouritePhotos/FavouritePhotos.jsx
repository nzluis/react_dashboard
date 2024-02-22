import { useDispatch, useSelector } from "react-redux"
import { removePhoto, editDescription } from "../../features/favourites/favouritesSlice"
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Modal, Input, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import { TextareaAutosize } from "@mui/base"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HeightIcon from '@mui/icons-material/Height';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import InfoIcon from '@mui/icons-material/Info';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styles from './favouritesPhotos.module.css'
import { useMediaQuery } from 'react-responsive'


import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import { saveAs } from 'file-saver';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function getFilteredPhotos(photos, searchTerm) {
    return photos.filter(photo => photo.description.toLowerCase().includes(searchTerm.toLowerCase()));
}

function getOrderedPhotos(photos, filter) {
    if (filter === 'newer') return photos.sort((prevPhoto, nextPhoto) => nextPhoto['created_at'] - prevPhoto['created_at']).reverse()
    return photos.sort((prevPhoto, nextPhoto) => nextPhoto[filter] - prevPhoto[filter])
}

export const FavouritePhotos = () => {

    const favourites = useSelector((state) => state.favourites)
    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState(false)
    const [selectedPic, setSelectedPic] = useState({})
    const [orderBy, setOrderBy] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditMode(false)
    }

    const filterBySearch = getOrderedPhotos(getFilteredPhotos(favourites, searchInput), orderBy)
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

    function handleDownload(url, text) {
        saveAs(url, text)
    }

    function handleModal(photo) {
        setSelectedPic(photo)
        handleOpen()
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
                            onKeyDown={(e) => e.key === 'Enter' && setSearchInput('')}
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={{
                    maxWidth: 345,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }} >
                    <CardMedia
                        sx={{ width: '425px' }}
                        image={selectedPic.src_preview}
                        title={selectedPic.alt_description}
                        component='img'
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            <div className={styles.features}>
                                <HeightIcon /> {selectedPic.height}
                                <SettingsEthernetIcon /> {selectedPic.width}
                            </div>
                            <div className={styles.features}>
                                <CalendarMonthIcon /> {selectedPic.created_at}
                                <ThumbUpIcon />  {selectedPic.likes}
                            </div>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {favourites.map(favouritePic => {
                                if (favouritePic.id === selectedPic.id) {
                                    return !editMode ? favouritePic.description : (
                                        <span key={favouritePic.id}>
                                            <TextareaAutosize className={styles.textarea}
                                                value={favouritePic.description || ''}
                                                onChange={(e) => dispatch(editDescription({ id: favouritePic.id, description: e.target.value }))}
                                            />
                                        </span>
                                    )
                                }
                            })}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => handleDownload(selectedPic.src_full, selectedPic.id)} size="small">Download</Button>
                        <Button onClick={() => setEditMode(prev => !prev)} size="small">{!editMode ? 'Edit Description' : 'Close Edit'}</Button>
                    </CardActions>
                </Card>
            </Modal >
        </>
    )
}