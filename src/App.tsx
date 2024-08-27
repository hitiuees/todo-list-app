import './index.css';
import AddTask from './components/AddTask';
import Tasklist from './components/Taskslist';
import { useEffect, useState } from 'react';
import { tasks } from './components/datatasks';

function App() {
  // State to manage the list of tasks
  const [taskslist, settaskslist] = useState(tasks);

  // useEffect to load saved tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskslist'); // Retrieve tasks from localStorage
    if (savedTasks) {
      settaskslist(JSON.parse(savedTasks)); // Set taskslist state with parsed localStorage data if available
    }
  }, []);

  return (
    <>
      {/* Main container with centered content and spacing */}
      <div className='flex flex-col justify-center items-center space-y-8 mt-3'>
        
        {/* AddTask component for adding new tasks */}
        <AddTask taskslist={taskslist} settaskslist={settaskslist} />
        
        {/* Conditionally render Tasklist component if taskslist is not empty */}
        {taskslist.length === 0 ? (
          "" // No tasks, so no Tasklist displayed
        ) : (
          <Tasklist taskslist={taskslist} settaskslist={settaskslist} />
        )}
      </div>
    </>
  );
}

export default App;


