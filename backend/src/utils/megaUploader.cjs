const mega = require('megajs');
const fs = require('fs');
const path = require('path');

// Authenticate with MEGA
const authenticate = async (email, password) => {
    return new Promise((resolve, reject) => {
        const storage = mega({ email, password });

        storage.on('ready', () => {
            console.log('Logged into MEGA successfully!');
            resolve(storage);
        });

        storage.on('error', (err) => {
            console.error('Error logging into MEGA:', err);
            reject(err);
        });
    });
};

// Find or create a folder in MEGA
const getOrCreateFolder = async (storage, folderName) => {
    return new Promise((resolve, reject) => {
        const folder = storage.root.children.find(child => child.name === folderName);

        // if (!folder) {
        //     console.log(`Folder "${folderName}" not found. Creating the folder...`);
        //     storage.createFolder(folderName, storage.root, (err, createdFolder) => {
        //         if (err) {
        //             console.error('Error creating folder:', err);
        //             reject(err);
        //         } else {
        //             console.log(`Folder "${folderName}" created successfully!`);
        //             resolve(createdFolder);
        //         }
        //     });
        // } else {
        //    
        // }
        console.log(`Folder "${folderName}" found!`);
        resolve(folder);
    });
};

// Upload a single file to MEGA
const uploadFile = async (folder, filePath) => {
    return new Promise((resolve, reject) => {
        const fileName = path.basename(filePath);
        console.log(`Uploading file "${fileName}" to MEGA...`);

        const uploadStream = folder.upload({
            name: fileName,
            allowUploadBuffering: true,
        });

        fs.createReadStream(filePath).pipe(uploadStream);

        uploadStream.on('complete', (file) => {
            console.log(`File "${fileName}" uploaded successfully!`);
            resolve(file.link()); // Public link
        });

        uploadStream.on('error', (err) => {
            console.error(`Error uploading file "${fileName}":`, err);
            reject(err);
        });
    });
};

// Main uploader function
const uploader = async (folderName, videoFilePath, email, password) => {
    const storage = await authenticate(email, password);
    const folder = await getOrCreateFolder(storage, folderName);
    const fileLink = await uploadFile(folder, videoFilePath);
    return fileLink; // Return the public link
};

module.exports = { uploader };
