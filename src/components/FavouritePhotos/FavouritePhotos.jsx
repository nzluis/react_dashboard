import { useDispatch, useSelector } from "react-redux"
import { removePhoto, editDescription } from "../../features/favourites/favouritesSlice"
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Modal, Input } from "@mui/material"
import { TextareaAutosize } from "@mui/base"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HeightIcon from '@mui/icons-material/Height';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import InfoIcon from '@mui/icons-material/Info';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styles from './favouritesPhotos.module.css'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import { saveAs } from 'file-saver';
import { useEffect, useState } from "react";

function getFilteredPhotos(photos, searchTerm) {
    return photos.filter(photo => photo.description.toLowerCase().includes(searchTerm.toLowerCase()));
}

export const FavouritePhotos = () => {

    const favourites = useSelector((state) => state.favourites)
    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState(false)
    const [selectedPic, setSelectedPic] = useState({})
    const [searchInput, setSearchInput] = useState('')
    const filterBySearch = getFilteredPhotos(favourites, searchInput)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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
            <h1>Favourites</h1>
            <Input
                value={searchInput}
                onChange={(e) => { setSearchInput(e.target.value) }}
                onKeyDown={(e) => e.key === 'Enter' && setSearchInput('')}

            />
            <div className={styles.container}>
                {filterBySearch && filterBySearch.map((favouritePic) => {
                    return (
                        <div key={favouritePic.id} >
                            <Zoom>
                                <img
                                    src={favouritePic.src_regular}
                                    alt={favouritePic.alt_description}
                                    width={400}
                                />
                            </Zoom>
                            <InfoIcon onClick={() => handleModal(favouritePic)} />
                            <RemoveCircleIcon onClick={() => dispatch(removePhoto(favouritePic.id))} />
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
                <Card sx={{ maxWidth: 345 }} className={styles.modal} >
                    <CardMedia
                        sx={{ height: 140 }}
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