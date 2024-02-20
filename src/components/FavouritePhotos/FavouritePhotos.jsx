import { useDispatch, useSelector } from "react-redux"
import { removePhoto, editDescription } from "../../features/favouritesSlice"
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material"
import { TextareaAutosize } from "@mui/base"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { saveAs } from 'file-saver';
import { useState } from "react";

export const FavouritePhotos = () => {

    const favourites = useSelector((state) => state.favourites)
    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState(false)

    function handleRemove(e) {
        dispatch(removePhoto(e.target.dataset.id))
    }
    function handleDownload(url, text) {
        saveAs(`${url}/download`, `${text}.jpeg`)
    }
    // function handleSubmit() {
    //     console.log(e.target.value)
    // }

    return (
        <>
            <h1>Favourites</h1>
            {favourites && favourites.map((favouritePic) => {
                return (
                    <div key={favouritePic.id} style={{ display: 'inline' }}>
                        <img
                            onClick={(e) => handleRemove(e)}
                            src={favouritePic.src_preview}
                            alt={favouritePic.alt_description}
                            data-id={favouritePic.id}
                        />
                        {/* style={{ display: 'none' }} */}
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={favouritePic.src_preview}
                                title={favouritePic.alt_description}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    <ThumbUpIcon />  {favouritePic.likes}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {!editMode ? favouritePic.description : (
                                        <>
                                            <TextareaAutosize
                                                value={favouritePic.description}
                                                onChange={(e) => dispatch(editDescription({ id: favouritePic.id, description: e.target.value }))}
                                            />
                                            {/* <input type="submit" onSubmit={(e) => handleSubmit(e)} /> */}
                                        </>
                                    )}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleDownload(favouritePic.download, favouritePic.id)} size="small">Download</Button>
                                <Button onClick={() => setEditMode(prev => !prev)} size="small">{!editMode ? 'Edit Description' : 'Close Edit'}</Button>
                            </CardActions>
                        </Card>
                    </div>
                )
            })}
        </>
    )
}