import { createServer } from 'http';
import handleRequest from './src/server.js';

const port = process.env.PORT || 3000;

const server = createServer(handleRequest);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
