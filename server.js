/**
 * Resilient local server for Louvre Revolution Webtoy
 * Automatically finds an available port and launches the user's default browser
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let port = 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ogg': 'audio/ogg',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  let filePath = path.join(BASE_DIR, decodeURIComponent(reqPath));

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*'
  });
  fs.createReadStream(filePath).pipe(res);
});

function startServer(p) {
  server.listen(p, () => {
    const url = `http://localhost:${p}`;
    console.log(`\n======================================================`);
    console.log(`🏛️  LOUVRE REVOLUTION & LITERARY ANTIGRAVITY WEBTOY`);
    console.log(`======================================================`);
    console.log(`🌐 Server running at: ${url}`);
    console.log(`🇫🇷 Press Ctrl+C to stop.`);
    console.log(`======================================================\n`);

    // Auto-launch in browser
    exec(`start ${url}`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    port++;
    startServer(port);
  } else {
    console.error('Server error:', err);
  }
});

startServer(port);
