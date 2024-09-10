import { Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { Data } from "./datatasks";
import { ChangeEvent, Dispatch, useState } from "react";

interface Props {
  taskslist: Data[]; // List of tasks
  settaskslist: Dispatch<React.SetStateAction<Data[]>>; // Function to update tasks list
}

// Initial structure of a task
const faketask = {
taskid:'',
  content: '',        
  isCompleted: false,
};

const AddTask = (props: Props) => {
  const [utiltask, setutiltask] = useState(faketask); // State for handling input task

  // Handle input change and update task content
  const handleonchange = (e: ChangeEvent<HTMLInputElement>) => {
    setutiltask({ ...faketask, content: e.target.value ,taskid:`${props.taskslist.length +1}`}); // Update content in utiltask
  };

  // Handle task submission
  const handlesubmit = async() => {
    if (utiltask.content.trim() !== "") {
      // Update tasks list with new task
      const updatedarray = [...props.taskslist, { ...utiltask, taskid: (props.taskslist.length + 1).toString() }];
      props.settaskslist(updatedarray); // Update tasks state with new task
      console.log(updatedarray);
            const response = await fetch('http://localhost:5000/tasks', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(utiltask) //addeding data to db 
          })
          const responsewait=await response
      setutiltask(faketask); 
      return responsewait
    }
   
  };

  return (
    <>
      {/* Paper element for UI container */}
      <Paper elevation={3}>
        <div className='text-center font-bold mt-10 p-7 text-2xl text-blue-500'>
          TODO LIST APP
        </div>

        {/* Flex container for input and button */}
        <div className="flex flex-row">
          {/* TextField for task input */}
          <TextField
            value={utiltask.content}
            onChange={handleonchange}
            sx={{ borderRadius: 2, margin: '4rem', width: '750px' }}
            required
            placeholder="Please add a task" // Replaced defaultValue with placeholder
          />
         
          {/* Button to submit the task */}
          <Button
            onClick={handlesubmit}
            sx={{ height: "50px", margin: '4rem' }}
            variant="contained"
            color="primary"
          >
            
            Submit Task
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default AddTask;