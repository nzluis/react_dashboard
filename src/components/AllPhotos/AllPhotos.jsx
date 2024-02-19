import { useDispatch } from "react-redux"
import { data } from "../../data"
import { addPhoto } from "../../features/favouritesSlice"

export const AllPhotos = () => {
    const dispatch = useDispatch()
    function handleLike(e) {
        console.log(e.target)
        dispatch(addPhoto({
            src: e.target.src
        }))
    }
    return (
        <>
            <h1>All</h1>
            {data.map((pic, index) => {
                return <img key={index} onClick={(e) => handleLike(e)} src={pic.urls.small} alt="" />
            })}
        </>
    )
}