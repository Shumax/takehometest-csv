import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import sendResponse from "../utils/response.js";

export default function handleFileUpload(req, res) {
  
  let data = [];
   
  req.on('data', function(chunk) {
    data.push(chunk);
  });

  req.on('end', function() {
    const file = Buffer.concat(data).toString();

    if(!file) sendResponse(res, 400, "Error: Empty request!");

    if(!file.includes('Content-Type: text/csv')) sendResponse(res, 400, "Error: Type file!");

    const startDelimiter = 'Content-Type: text/csv';
    const endDelimiter = '----------------------------';

    const startIndex = file.indexOf(startDelimiter) + startDelimiter.length;
    const endIndex = file.lastIndexOf(endDelimiter);

    const csvData = file.slice(startIndex, endIndex).trim();

    const rows = csvData.split('\n');
    const keys = rows[0].split(',');
    rows.shift();

    const result = [];

    rows.map((el) => {
      const columns = el.split(',');
  
      let obj = {};
      
      columns.map((value, index) => {
        obj[keys[index].trim()] = value.trim();
      })

      result.push(obj);
    })

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    let filename = join(__dirname,'../../public/dataUploads.json');

    fs.writeFile(filename, JSON.stringify(result), (err) => {
      if (err) {
        console.error('Error saving file:', err);
        sendResponse(res, 500, 'Error saving file!');
      } else {
        sendResponse(res, 201, { msg: 'Success: uploaded!', filename }); 
      }
    });

  });

  req.on('error', (error) => {
    console.error('Request error:', error);
    sendResponse(res, 500, 'Error in request');
  });

}
