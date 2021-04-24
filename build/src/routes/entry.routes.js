"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryRoutes = void 0;
const controllers_1 = require("../controllers");
const entryRoutes = (app) => {
    app.post("/entries/publish", (req, res) => new controllers_1.EntryController(req, res).publishEntry());
};
exports.entryRoutes = entryRoutes;
