import { data } from "../../data"

export const AllPhotos = () => {
    return (
        <>
            <h1>All</h1>
            {data.map((pic, index) => {
                return <img key={index} src={pic.urls.small} alt="" />
            })}
        </>
    )
}