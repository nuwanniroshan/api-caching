import express, { Request, Response, Application } from "express";
import * as Routers from "./routers";
import { CachingService } from "./caching/cashingService";
import { RedisClient } from "./caching/redisClient";

const cache = CachingService.getInstance();
cache.setClient(new RedisClient());

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Routers.TodoRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

const server = app.listen(port, () => {
  cache.connect();
  console.log(`Server is Fire at http://localhost:${port}`);
});

const shutdown = (signal: string) => {
  console.log(`Received ${signal}. Closing server...`);
  server.close(() => {
    console.log("Server closed. Exiting process...");
    process.exit(0);
  });

  cache.disconnect();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
