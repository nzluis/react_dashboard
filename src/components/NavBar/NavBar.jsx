import { useState } from "react";
import styles from "./navbar.module.css"
import { Input } from '@mui/material';

export const NavBar = () => {
    const [searchInput, setSearchInput] = useState('')
    console.log(searchInput)
    function handleSubmit(e) {
        e.preventDefault()
        alert('sending ' + searchInput)
        setSearchInput('')
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.logo}>logo</div>
                <form onSubmit={handleSubmit}>
                    <Input value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
                    <button style={{ display: 'none' }} type="submit"></button>
                </form>
                <div className={styles.selector}>Selector</div>
            </div >
        </>
    )
}