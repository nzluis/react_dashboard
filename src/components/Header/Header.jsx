import { useState } from "react"
import styles from "./header.module.css"

export const Header = () => {

    return (
        <div className={styles.container}>
            <div className={styles.first_column}>
                <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        placeholder="LOOK FOR A PICTURE..."
                        className={styles.input}
                        value={searchInput}
                        onChange={(e) => { setSearchInput(e.target.value) }}
                    />
                    <button style={{ display: 'none' }} type="submit"></button>
                </form>
                <h1 className={styles.h1}>FIND YOUR VISION</h1>
            </div>
            <div className={styles.second_column}>
                <h2 className={styles.h2}>BEST FREE PICTURES ON INTERNET</h2>
                <h3 className={styles.h3}>All kind of images shared by their creators</h3>
            </div>
        </div>
    )
}