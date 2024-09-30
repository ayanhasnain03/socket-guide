import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (client) => {
  console.log(`Client connected: ${client.id}`);

  client.on("message", (message) => {
    console.log(message);
  });

  client.emit("from-server-mess", "Hello from server 👋");

  client.on("disconnect", () => {
    console.log(`Client disconnected: ${client.id} ❌`);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
