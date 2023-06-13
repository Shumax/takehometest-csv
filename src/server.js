import { URL  } from 'url';
import handleFileUpload from './controllers/fileController.js';
import handleSearch from './controllers/searchController.js';
import sendResponse from './utils/response.js';

export default async function handleRequest(req, res) {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/api/files' && req.method === 'POST') {
    handleFileUpload(req, res);
  } else if (pathname === '/api/users' && req.method === 'GET') {
    const query = searchParams.get('q');
    handleSearch(req, res, query);
  } else {
    sendResponse(res, 404, 'Error: Not found!');
  }

};

