import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import Actions from './Actions';
import PlanificationTask from './PlanificationTasks';
import { searchedTasksAtom, tasksAtom } from './atoms';
import Search from './search';
import { useStyles } from './tasks.styles';





const Task = () => {
    const classes = useStyles()
    const [task, setTask] = useState()
    const [tasks, setTasks] = useAtom(tasksAtom)
    const [textValue, setTextValue] = useState('')
    const [hasModeEdition, setHasModeEdition] = useState(false)
    const id = useRef(0)

    const uid = () => id.current
    const [searchedTasks, setSearchedTasks] = useAtom(searchedTasksAtom)
    const currentTasks = searchedTasks?.length > 0 ? searchedTasks : tasks


    const editTask = (event, task) => {
        setTask({ ...task, name: event.target.value })
    }

    const confirmEdit = (id) => {
        setHasModeEdition(false)
        const updatesTasks = currentTasks.map((item => {
            if (item.id !== id) {
                return item
            }
            return { ...task, isEdit: false }
        }))
        const updatedItem = updatesTasks.find((item) => item.id === id)
        const result = tasks.map((item) => item.id === id ? updatedItem : item)
        setTasks(result)
        if (searchedTasks && searchedTasks.length > 0) {
            setSearchedTasks(updatesTasks)

        }
    }

    const handleChange = (event) => {
        setTextValue(event.target.value)
        setTask({ name: event.target.value, etat: 'En cours' })
    }
    const handleAdd = () => {
        setTextValue('')
        setTask(null)
        const data = [...currentTasks, { ...task, id: uid(), isEdit: false }]
        setTasks(data)
        id.current = id.current + 1
    }
    const handleCancel = (task) => {
        setHasModeEdition(false)
        setTask({ ...task, isEdit: false })
        const result = currentTasks.map((item) => {
            if (item.id !== task.id) {
                return item
            }
            return { ...task, isEdit: false }
        })
        setData(result)
    }

    const setData = (data) => {

        if (searchedTasks?.length <= 0 || !searchedTasks) {
            setTasks(data)
            return
        }
        setSearchedTasks(data)
    }

    const getColor = (etat) => etat === 'En cours' ? 'red' : 'green'

    return (
        <div className={classes.containerTasks}>
            <Search currentTasks={currentTasks} setSearchedTasks={setSearchedTasks} />
            <Paper elevation={3} sx={{ minHeight: '85vh' }} >
                <PlanificationTask
                    onClick={handleAdd}
                    onChange={handleChange}
                    label="Planifier vos taches"
                    value={textValue}
                    title="Ajouter"
                    disabled={!textValue}
                />
                <>
                    <Typography sx={{ mt: 4 }} variant="h6" component="div">
                        Mes taches
                    </Typography>
                    {currentTasks?.map((currentTask, index) => (
                        <List dense={true} key={index}>
                            <ListItem
                                secondaryAction={
                                    <Actions
                                        searchedTasks={searchedTasks}
                                        setSearchedTasks={setSearchedTasks}
                                        currentTasks={currentTasks}
                                        setTasks={setTasks}
                                        setTask={setTask}
                                        currentTask={currentTask}
                                        hasModeEdition={hasModeEdition}
                                        setModeEdition={setHasModeEdition}
                                    />
                                }
                            >
                                {!currentTask?.isEdit && (<ListItemText
                                    sx={{ color: getColor(currentTask?.etat) }}
                                    primary={currentTask?.name}
                                    secondary={
                                        <Typography
                                            sx={{ color: getColor(currentTask?.etat), fontWeight: 'bold' }}>
                                            {currentTask?.etat}</Typography>}
                                />)}

                                {currentTask?.isEdit && (
                                    <PlanificationTask
                                        onClick={() => confirmEdit(currentTask.id)}
                                        label="Modifier vos taches"
                                        onChange={(event) => { editTask(event, task) }}
                                        value={task?.name ?? currentTask?.name}
                                        title="confirmer"
                                        onCancel={() => handleCancel(currentTask)}
                                        variant="outlined"
                                    />

                                )}
                            </ListItem>
                        </List>
                    ))}
                    {currentTasks?.length <= 0 && (<div> Pas de taches planifées!</div>)}
                </>
            </Paper >
        </div>
    )
}
export default Task