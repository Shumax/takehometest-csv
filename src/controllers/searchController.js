import path, { join } from 'path';
import { readFileSync } from 'fs';
import sendResponse from '../utils/response.js';

const __dirname = path.resolve();

const data = JSON.parse(readFileSync(join(__dirname,'/public/dataUploads.json'), 'utf8'));

export default function handleSearch(req, res, query) {

  try {

    if(!query) throw 'Error: Empty query!';
    
    const results = [];
    
    data.filter((row) => {
      for(const value of Object.values(row)) {
        if(value.toLowerCase().includes(query.toLowerCase())) results.push(row);
      }
    });

    sendResponse(res, 200, results);
    
  } catch (err) {
    return sendResponse(res, 400, err);
  }
}
