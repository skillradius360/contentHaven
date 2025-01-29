import fs from 'fs';
import { google } from 'googleapis';

import { apikeys } from '../credentials.js';

const SCOPE = ['https://www.googleapis.com/auth/drive'];

console.log(apikeys.client_email);

// A function that can provide access to Google Drive API
const authorize = async () => {
  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPE
  );

  await jwtClient.authorize();
  return jwtClient;
};

// A function that will upload the desired file to Google Drive folder
const uploadFile = async (authClient,filepath) => {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: 'v3', auth: authClient });

    const fileMetaData = {
      name: filepath, // The file name to upload
      parents: ['15Mwg33xkc9j__nHcvGLDp_lemdt4LrCb'] // The folder ID to which the file will be uploaded
    };

    drive.files.create(
      {
        resource: fileMetaData,
        media: {
          body: fs.createReadStream(filepath), // The file to upload
          mimeType: 'video/mp4'
        },
        fields: 'id'
      },
      (error, file) => {
        if (error) {
          return reject(error);
          console.log("file upload error")
        }
        resolve(file);

        console.log("uploaded file successfully!")
        return file
              }
    );
  });
};

// Authorize and then upload the file
export const main = async (filepath) => {
  try {
    const authClient = await authorize();
    const data = await uploadFile(authClient,filepath);
    console.log("!!!file upload resolved!!!"); // This will be logged only after the upload is complete
    return `https://drive.google.com/file/d/${data.data.id}/preview`
    
  } catch (error) {
    console.error(error); // Error handling
  }
};

// main("./Victoria.mp4"); // Run the main function


