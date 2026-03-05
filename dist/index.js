"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World from Vercel + TypeScript!");
});
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
