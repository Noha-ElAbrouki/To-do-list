
import Task from './tasks';
import { useStyles } from './tasks/tasks.styles';

function App() {
  const classes = useStyles()
  return (
    <div className={classes.app}>
      <Task />
    </div>
  );
}

export default App;
