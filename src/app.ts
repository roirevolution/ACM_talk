import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import logger from "./util/logger";
import lusca from "lusca";
import dotenv from "dotenv";
import flash from "express-flash";
import path from "path";
import expressValidator from "express-validator";
import bluebird from "bluebird";
import { SESSION_SECRET } from "./util/secrets";

// Get a datadog connection
import metrics from "datadog-metrics";
const host = process.env.production ? "production" : "dev";
metrics.init({ prefix: "ROI_pizza.", host: host });

console.log("Starting app");
metrics.increment("app.start");

// Load environment variables from .env file, where API keys and passwords are configured
if (!process.env.production) {
  dotenv.config({ path: ".env" });
}

// Controllers (route handlers)
import * as orderController from "./controllers/order";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
}));
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", orderController.newOrder);

/**
 *  Ordering pizza routes
 */
app.get("/order", orderController.newOrder);
app.post("/save_order", orderController.saveOrder);

export default app;