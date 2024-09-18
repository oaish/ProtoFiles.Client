export const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                resolve(reader.result.toString());
            } else {
                reject(new Error("FileReader failed to read the blob"));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

