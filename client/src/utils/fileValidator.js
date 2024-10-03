// Define the isPDF function
const isPDF = (file) => {
    if (!file || !file.name) {
        return false;
    }
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return fileExtension === 'pdf';
};

// Export the isPDF function
export { isPDF };
