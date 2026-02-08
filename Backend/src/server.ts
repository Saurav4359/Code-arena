import type { Express } from "express";
import { WebSocketServer } from "ws";
import { createServer } from "http";
import url from "url";
import EventEmitter from "events";
const port = process.env.PORT! || 3020;

const workerBus = new EventEmitter();

const submissionClients = new Map();

export async function runServer(app: Express) {
  const server = createServer(app);

  const wss = new WebSocketServer({ noServer: true });
  wss.on("connection", (ws, request) => {
    const { query } = url.parse(request.url!, true);
    const submissionId = query.submissionId;

    console.log("Ws connections is established");
    if (!submissionClients.has(submissionId)) {
      submissionClients.set(submissionId, new Set());
    }
    submissionClients.get(submissionId).add(ws);

    ws.on("close", () => {
      submissionClients.get(submissionId)?.delete(ws);
    });
  });

  workerBus.on("update", ({ submissionId, data }) => {
    const clients = submissionClients.get(submissionId);
    if (!clients) return;

    for (const ws of clients) {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(data));
      }
    }
  });
  server.on("upgrade", (request, socket, head) => {
    const pathname = url.parse(request.url!).pathname;

    if (pathname === "/ws") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    } else {
      socket.destroy();
    }
  });
  server.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
}

export function pushWorkerUpdate(submissionId: string, data: any) {
  workerBus.emit("update", { submissionId, data });
}
