import React from 'react';
import SearchBar from "material-ui-search-bar";
import { useAtom } from 'jotai';
import { serachedValueAtom } from '../atoms';
import { useStyles } from '../tasks.styles';



const Search = ({ currentTasks, setSearchedTasks }) => {
    const classes = useStyles()
    const [searched, setSearched] = useAtom(serachedValueAtom)


    const handleSearch = (value) => {
        if (!value) {
            cancelSearch()
            return
        }
        setSearched(value)
        const result = currentTasks?.filter((item) => item?.name?.toLowerCase().includes(value?.toLowerCase()) || item?.etat?.toLowerCase().includes(value?.toLowerCase())
        )

        setSearchedTasks(result)
    }
    const cancelSearch = () => {
        setSearched('')
        setSearchedTasks([])
    }


    return (
        <SearchBar
            value={searched}
            onChange={(searchVal) => handleSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            placeholder="Chercher par etat ou nom"
            className={classes.search}
        />
    )
}

export default Search 