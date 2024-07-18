import { makeStyles } from '@mui/styles';


export const useStyles = makeStyles({
    addContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    app: {

        textAlign: 'center',
    },
    containerTasks: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '85vh'
    },
    search: {
        width: '50%',
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'end'
    }
});