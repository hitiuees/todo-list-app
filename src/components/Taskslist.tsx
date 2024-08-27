import { Paper } from "@mui/material";
import { CheckCircleOutline, Close } from '@mui/icons-material';
import { Data } from "./datatasks";
import Button from '@mui/material/Button';
import { Dispatch, useEffect } from "react";

interface Props {
    taskslist: Data[];
    settaskslist: Dispatch<React.SetStateAction<Data[]>>;
}

const Tasklist = (props: Props) => {
    // Function to clear all tasks and reset localStorage
    const cleantasks = () => {
        props.settaskslist([]); // Clear tasks list
        localStorage.clear();   // Clear localStorage
    }

    // useEffect to update localStorage when taskslist changes
    useEffect(() => {
        localStorage.setItem('taskslist', JSON.stringify(props.taskslist)); // Store taskslist in localStorage
    }, [props.taskslist]); // Effect runs when taskslist changes

    // Function to toggle task completion by id
    const handleToggleCompletion = (taskId: string) => {
        props.settaskslist(tasks =>
            tasks.map(task => {
                if (task.id === taskId) {
                    const updatedTask = { ...task, isCompleted: true }; // Update task completion status
                    return updatedTask;
                }
                return task; // Return task unchanged if id doesn't match
            })
        );
    };

    return (
        <Paper elevation={3}>
            {/* Title for tasks list */}
            <div className='text-center font-bold p-7 text-2xl text-blue-500'>Tasks list</div>
            
            {/* Button to delete all tasks if there are any */}
            {props.taskslist.length === 0 ? (
                "" // No delete button if tasklist is empty
            ) : (
                <Button
                    onClick={cleantasks} // Call cleantasks function on click
                    sx={{
                        marginBottom: '3rem',
                        marginLeft: '2rem',
                        backgroundColor: '#ff6b6b',
                        '&:hover': {
                            backgroundColor: '#ff4d4d',
                        },
                        color: 'white',
                    }}
                    variant="contained"
                >
                    Delete All Tasks
                </Button>
            )}

            {/* Display each task in taskslist */}
            {props.taskslist.map(task => (
                <div key={task.id} className="text-center font-semibold p-2 flex flex-row">
                    <div className="font-bold">{task.id}.</div> {task.content} {/* Display task id and content */}
                    
                    {/* Show different icons based on task completion status */}
                    {task.isCompleted ? (
                        <CheckCircleOutline style={{ color: 'green' }} /> // Completed task icon
                    ) : (
                        <Close style={{ color: 'red' }} /> // Incomplete task icon
                    )}

                    {/* Show "Complete" button if task is not completed */}
                    {!task.isCompleted && (
                        <Button
                            data-task-id={task.id} // Set task id as data attribute
                            onClick={(e) => {
                                const taskId = e.currentTarget.getAttribute('data-task-id'); // Get task id from attribute
                                handleToggleCompletion(String(taskId)); // Call handleToggleCompletion with taskId
                            }}
                            sx={{
                                marginLeft: '3rem',
                                backgroundColor: '#ff6b6b',
                                '&:hover': {
                                    backgroundColor: '#ff4d4d',
                                },
                                color: 'white',
                            }}
                            variant="contained"
                        >
                            Complete
                        </Button>
                    )}
                </div>
            ))}
        </Paper>
    );
};

export default Tasklist;

