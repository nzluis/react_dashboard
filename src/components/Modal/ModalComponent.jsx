import { Button, Card, CardActions, CardContent, CardMedia, Modal, TextareaAutosize, Typography } from "@mui/material"
import styles from './modalComponent.module.css'
import { saveAs } from 'file-saver';
import { useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HeightIcon from '@mui/icons-material/Height';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import { useDispatch } from "react-redux"
import { editDescription } from "../../features/favourites/favouritesSlice";


export const ModalComponent = ({ open, setOpen, selectedPic, favourites }) => {
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const handleClose = () => {
        setOpen(false);
        setEditMode(false)
    }

    function handleDownload(url, text) {
        saveAs(url, text)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={{
                minWidth: 320,
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }} >
                <CardMedia
                    sx={{ width: "100%" }}
                    image={selectedPic.src_preview}
                    title={selectedPic.alt_description}
                    component='img'
                />
                <CardContent>
                    <Typography
                        gutterBottom variant="h6" component="div">
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
    )
}
