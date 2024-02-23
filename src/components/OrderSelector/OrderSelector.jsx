import { Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import styles from './orderSelector.module.css'

export const OrderSelector = ({ orderBy, setOrderBy }) => {
    return (
        <FormControl fullWidth >
            <InputLabel className={styles.select} id="orderby">Order by</InputLabel>
            <Select className={styles.select}
                labelId="orderby"
                id="selectOrder"
                value={orderBy}
                label="Order by"
                onChange={(e) => setOrderBy(e.target.value)}
            >
                <MenuItem value="created_at">Older</MenuItem>
                <MenuItem value="newer">Newer</MenuItem>
                <MenuItem value="width">Width</MenuItem>
                <MenuItem value="height">Height</MenuItem>
                <MenuItem value="likes">Likes</MenuItem>
            </Select>
        </FormControl>
    )
}