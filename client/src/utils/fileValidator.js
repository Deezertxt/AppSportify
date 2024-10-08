export const isPDF = (file) => {
    if (!file || !file.name) {
        return false;
    }
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return fileExtension === 'pdf';
};

export const hasTextInPDF = async (file) => {
    if (!isPDF(file)) {
        return false;
    }

    try {
        const fileArrayBuffer = await file.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({ data: fileArrayBuffer }).promise;

        let hasText = false;

        const numPagesToCheck = Math.min(pdf.numPages, 5);
        for (let i = 1; i <= numPagesToCheck; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            if (textContent.items.length > 0) {
                hasText = true;
                break;
            }
        }

        return hasText;
    } catch (error) {
        console.error('Error reading PDF:', error);
        return false;
    }
};
