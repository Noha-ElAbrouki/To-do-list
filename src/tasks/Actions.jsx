import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useStyles } from './tasks.styles'


const Actions = ({ currentTasks, setTasks, setTask, currentTask, searchedTasks, setSearchedTasks, hasModeEdition, setModeEdition }) => {
    const classes = useStyles()

    const isDisabled = !currentTask?.isEdit && hasModeEdition

    const setData = (data) => {

        if (searchedTasks?.length <= 0 || !searchedTasks) {
            setTasks(data)
            return
        }
        setSearchedTasks(data)
    }

    const handleDelete = (id) => {
        const result = currentTasks.filter((item) => item.id !== id)
        setData(result)
    }

    const handleCompleted = (id) => {
        const updatedTasks = currentTasks.map((item => {
            if (item.id !== id) {
                return item
            }
            return { ...item, etat: 'completed' }
        }))
        setData(updatedTasks)
    }

    const handleEdit = (task) => {
        setModeEdition(true)
        setTask({ ...task, isEdit: true })
        const result = currentTasks.map((item) => {
            if (item.id !== task.id) {
                return item
            }
            return { ...task, isEdit: true }
        })
        setData(result)
    }

    return (
        <div className={classes.addContainer}>
            <IconButton edge="end" aria-label="edite" onClick={() => handleEdit(currentTask)} disabled={isDisabled}>
                <EditIcon color={isDisabled ? "disabled" : "primary"} />
            </IconButton>
            <IconButton edge="end" aria-label="complete" onClick={() => handleCompleted(currentTask.id)} disabled={isDisabled}>
                <CheckIcon color={isDisabled ? "disabled" : "primary"} />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(currentTask.id)} disabled={isDisabled}>
                <DeleteIcon color={isDisabled ? "disabled" : "primary"} />
            </IconButton>
        </div>
    )
}

export default Actions