import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";

export const Root = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}