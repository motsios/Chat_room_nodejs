var express = require("express");
var app = express();
const server = require("http").createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: server });

wss.on('connection', function connection(ws) {
  console.log("New client connected")

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.onclose = function() {
    console.log(`Client ${ws.id} has disconnected!`);
  };
});

app.get("/", (req, res) => res.send("Hellooo"));

server.listen(3000, () => console.log("Port:3000"));
