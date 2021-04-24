import express from "express";
import { EntryController } from "../controllers";

const entryRoutes = (app: express.Express) => {
  app.post("/entries/publish", (req, res) =>
    new EntryController(req, res).publishEntry()
  );
  app.get("/entries/:code", (req, res) =>
    new EntryController(req, res).fetchSubmission()
  );
};

export { entryRoutes };
