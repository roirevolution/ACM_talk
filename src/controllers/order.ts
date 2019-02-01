import { Request, Response } from "express";
import * as fs from "fs";


// Get a datadog connection
import metrics from "datadog-metrics";
metrics.init({ prefix: "ROI_pizza." });

// Create the list of pizza orders. Only methods in this file can access it.
const orders = new Map();
// Create an order ID counter.
let order_id_counter = 0;

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
  const all_keys = Object.keys(body);
  const toppings = all_keys.filter(
    (t) => validTopping(t)
  );
  return toppings.map((topping) => process_images_for(topping));
}

function process_images_for(topping: string): string {
  if (topping == "Spicy Mushrooms") {
    console.log("Someone ordered spicy mushrooms!");
  }
  return topping;
}

// Is this an actual topping, or is it something else?
// Used to ignore some parts of the new_order form.
function validTopping(topping: string): boolean {
  return topping != "name" && topping != "address";
}

// Add a new order to the list of orders
function addToOrders(toppings: Array<string>, name = "Matt", address = "4401 Atlantic Ave") {
  metrics.histogram("toppings_per_order", toppings.length);
  metrics.increment("orders");
  toppings.forEach((topping) => {
    metrics.increment("topping_ordered", 1, [`topping:${topping}`]);
  });
  const orderId = order_id_counter ++;
  orders.set(orderId, {toppings, name, address});
}

// Record any metrics that can easily be regularly recorded.
function record_cheap_metrics() {
  metrics.gauge("total_orders", orders.size);

  // Residential Set Size (rss) is the node process's own judgement of its memory use.
  // https://www.valentinog.com/blog/memory-usage-node-js/
  metrics.gauge("process_memory", process.memoryUsage().rss);
}

// record cheap metrics every 5 seconds.
setInterval(record_cheap_metrics, 1000 * 5);
