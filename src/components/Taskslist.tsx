import { Paper } from "@mui/material";
import { CheckCircleOutline, Close } from '@mui/icons-material';
import { Data } from "./datatasks"; // Import the Data interface
import Button from '@mui/material/Button';
import { Dispatch } from "react";

// Define the Props interface for Tasklist component
interface Props {
    tasklist: Data[]; // Array of tasks (Data type)
    settaskslist: Dispatch<React.SetStateAction<Data[]>>; // Function to update the tasks list
}

// Main Tasklist component
const Tasklist = (props: Props) => {
    // Function to clear all tasks both locally and on the server
    const cleantasks = async () => {
        props.settaskslist([]); // Clear local tasks list
        const response = await fetch("http://localhost:5000/tasks", {
            method: 'DELETE', // Send a DELETE request to the server to clear tasks
        });
        return response; // Return server response (optional)
    };

    // Function to update task status (mark as completed) on the server
    const updatetask = async (taskId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
                method: 'PUT', // Send a PUT request to update task status
                headers: {
                    'Content-Type': 'application/json', // Specify the request content type
                },
                body: JSON.stringify({ isCompleted: true }), // Update task completion status
            });

            // Check if the server response is OK
            if (!response.ok) {
                throw new Error(`Failed to update task with id: ${taskId}`); // Throw error if update fails
            }

            const updatedTaskData = await response.json(); // Get updated task data from the response
            handleToggleCompletion(taskId); // Update task completion status locally
            return updatedTaskData; // Return updated task data
        } catch (error) {
            alert(`Error updating task: ${error}`); // Alert user on error
            throw error; // Re-throw error for further handling
        }
    };

    // Function to toggle task completion locally (UI update)
    const handleToggleCompletion = (taskId: string) => {
        props.settaskslist(
            props.tasklist.map(task => {
                if (task.taskid === taskId) {
                    return { ...task, isCompleted: true }; // Mark task as completed
                }
                return task; // Return unchanged task if ID doesn't match
            })
        );
    };

    return (
        <Paper elevation={3}>
            {/* Tasks list title */}
            <div className='text-center font-bold p-7 text-2xl text-blue-500'>Tasks list</div>

            {/* Conditional rendering: Show "Delete All Tasks" button if task list is not empty */}
            {props.tasklist.length === 0 ? (
                "" // No button if tasklist is empty
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

            {/* Render each task in the tasks list */}
            {props.tasklist.map(task => (
                <div key={task.taskid} className="text-center font-semibold p-2 flex flex-row">
                    <div className="font-bold">.</div> {task.content} {/* Display task content */}
                    
                    {/* Display different icons based on task completion status */}
                    {task.isCompleted ? (
                        <CheckCircleOutline style={{ color: 'green' }} /> // Green icon for completed tasks
                    ) : (
                        <Close style={{ color: 'red' }} /> // Red icon for incomplete tasks
                    )}

                    {/* Show "Complete" button only if the task is not completed */}
                    {!task.isCompleted && (
                        <Button
                            data-task-id={task.taskid} // Store task ID in a data attribute
                            onClick={(e) => {
                                const taskId = e.currentTarget.getAttribute('data-task-id'); // Get task ID from the clicked button
                                updatetask(String(taskId)); // Call updatetask function with taskId
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

