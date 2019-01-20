import { Request, Response } from "express";


// Get a datadog connection
import metrics from "datadog-metrics";
metrics.init({ prefix: "NSCU_talk." });

export {
  newOrder,
  saveOrder
};

/**
 * GET /order
 * Start a new pizza order
 */
function newOrder (req: Request, res: Response) {
  metrics.increment("began_order");
  res.render("new_order", {
    title: "New Order"
  });
}

/**
 * POST /save_order
 * Parse the form body and save the new order
 */
function saveOrder (req: Request, res: Response) {
  const body = req.body;
  addToOrders(toppingsFrom(body), body.name, body.address);
  metrics.increment("order_saved");
  res.render("order_saved", {
    title: "Saved",
    text: "there"
  });
}

// Given this form submission, find the toppings we want.
function toppingsFrom(body: Object): Array<string> {
  return (Object.keys(body).filter((t) => validTopping(t))).slice(0, 3);
}

// Is this an actual topping, or is it something else?
// Used to ignore some parts of the new_order form.
function validTopping(topping: string): boolean {
  return topping != "name" && topping != "address";
}

// Add a new order to the list of orders
function addToOrders(toppings: Array<string>, name = "Matt", address = "4401 Atlantic Ave") {
  metrics.histogram("toppings_per_order", toppings.length);
  const orderId = toppings.sort().join(",");
  orders.set(orderId, {name, address});
  console.log(orders);
}

// Create the list of pizza orders. Only methods in this file can access it.
const orders = new Map();

// Record any metrics that can easily be regularly recorded.
function record_cheap_metrics() {
  metrics.gauge("total_orders", orders.size);
}

// record cheap metrics every 5 seconds.
setInterval(record_cheap_metrics, 1000 * 5);
