import './index.css';
import AddTask from './components/AddTask';
import Tasklist from './components/Taskslist';
import { useEffect, useState } from 'react';
import { Data } from './components/datatasks';
import { fetchtasks } from './api/tasks';


function App() {
  // State to manage the list of tasks
  const [taskslist, settaskslist] = useState<Data[]>([]);

 const gettasks=async()=>{
     const tasks =await fetchtasks()
     console.log(tasks)
     settaskslist(tasks)
 }
  useEffect(() => {
   gettasks()
   console.log( 'get data')
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
          <Tasklist tasklist={taskslist} settaskslist={settaskslist} />
        )}
      </div>
    </>
  );
}

export default App;


