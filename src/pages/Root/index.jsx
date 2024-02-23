import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";

export const Root = () => {
    return (
        <>
            <NavBar />
            <Toaster position="bottom-center" />
            <Outlet />
        </>
    )
}