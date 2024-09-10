// Function to fetch tasks from the server with error handling
export const fetchtasks = async () => {
    try {
        const response = await fetch("http://localhost:5000/tasks"); // Send GET request to server

        if (!response.ok) {
            throw new Error(`Failed to fetch tasks: ${response.statusText}`); // Throw error if response is not OK
        }

        const data = await response.json(); // Parse response data
        return data; // Return the tasks data
    } catch (error) {
        console.error("Error fetching tasks:", error); // Log the error to console
        throw error; // Re-throw the error for handling in the calling function
    }
};


