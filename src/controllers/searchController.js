import sendResponse from '../utils/response.js';

export default function handleSearch(req, res, query) {

  try {

    if(!query) throw 'Error: Empty query!';

    const { q } = query;

    sendResponse(res, 200, q);
    
  } catch (err) {
    return sendResponse(res, 400, err);
  }
}
