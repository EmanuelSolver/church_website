// Function to format the date
export const formatDate = (dateStr) =>{
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to format the time
export const formatTime = (timeStr) =>{
    const time = new Date(`1970-01-01T${timeStr}`);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return time.toLocaleTimeString('en-US', options);
}