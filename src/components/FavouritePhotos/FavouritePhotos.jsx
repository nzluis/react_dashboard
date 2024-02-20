import { useDispatch, useSelector } from "react-redux"
import { removePhoto, editDescription } from "../../features/favourites/favouritesSlice"
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material"
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

export const FavouritePhotos = () => {

    const favourites = useSelector((state) => state.favourites)
    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState(false)
    const [selectedPic, setSelectedPic] = useState({})

    useEffect(() => {
        localStorage.setItem('favouritePhotos', JSON.stringify(favourites))
    }, [favourites])

    function handleDownload(url, text) {
        saveAs(`${url}/download`, `${text}.jpg`)
    }

    return (
        <>
            <h1>Favourites</h1>
            <div className={styles.container}>
                {favourites && favourites.map((favouritePic) => {
                    return (
                        <div key={favouritePic.id} >
                            <Zoom>
                                <img
                                    src={favouritePic.src_regular}
                                    alt={favouritePic.alt_description}
                                    width={400}
                                />
                            </Zoom>
                            <InfoIcon onClick={() => setSelectedPic(favouritePic)} />
                            <RemoveCircleIcon onClick={() => dispatch(removePhoto(favouritePic.id))} />
                        </div>
                    )
                })}
            </div>
            {/* style={{ display: 'none' }} */}
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={selectedPic.src_preview}
                    title={selectedPic.alt_description}
                    component='img'
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <ThumbUpIcon />  {selectedPic.likes}
                        <HeightIcon /> {selectedPic.height}
                        <SettingsEthernetIcon /> {selectedPic.width}
                        <br></br>
                        <CalendarMonthIcon /> {selectedPic.created_at}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {favourites.map(favouritePic => {
                            if (favouritePic.id === selectedPic.id) {
                                return !editMode ? favouritePic.description : (
                                    <>
                                        <TextareaAutosize
                                            value={favouritePic.description}
                                            onChange={(e) => dispatch(editDescription({ id: favouritePic.id, description: e.target.value }))}
                                        />
                                    </>
                                )
                            }
                        })}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => handleDownload(selectedPic.full, selectedPic.id)} size="small">Download</Button>
                    <Button onClick={() => setEditMode(prev => !prev)} size="small">{!editMode ? 'Edit Description' : 'Close Edit'}</Button>
                </CardActions>
            </Card>
        </>
    )
}