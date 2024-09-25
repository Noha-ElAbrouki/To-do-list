import React from 'react'
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useStyles } from './tasks.styles';




const PlanificationTask = ({ label, title, onClick, onChange, value, variant = 'contained', onCancel, disabled = false }) => {
    const classes = useStyles()

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
                id="outlined-basic"
                label={label}
                variant="filled"
                value={value}
                onChange={onChange}
                sx={{ width: '100%' }}
            />
            <Button
                variant={variant}
                onClick={onClick}
                sx={{ minWidth: 100 }}
                disabled={disabled}

            >{title}</Button>
            {onCancel &&
                <Button
                    variant={variant}
                    onClick={onCancel}
                    sx={{ minWidth: 100 }}
                >
                    Annuler
                </Button>}

        </div>
    )
}

export default PlanificationTask
