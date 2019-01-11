import { Request, Response } from "express";

/**
 * GET /order
 * start a new pizza order
 */
export {
  newOrder,
  saveOrder
};

function newOrder (req: Request, res: Response) {
  res.render("new_order", {
    title: "New Order"
  });
}

function saveOrder (req: Request, res: Response) {
  const body = req.body;
  addToOrders(toppingsFrom(body), body.name, body.address);
  res.render("order_saved", {
    title: "Saved",
    text: "there"
  });
}

function toppingsFrom(body: Object): Array<string> {
  return Object.keys(body).filter((t) => validTopping(t)) ;
}

function validTopping(topping: string): boolean {
  return topping != "name" && topping != "address";
}

function addToOrders(toppings: Array<string>, name = "Matt", address = "4401 Atlantic Ave") {
  const orderId = toppings.sort().join(",");
  orders.set(orderId, {name, address});
  console.log(orders);
}

const orders = new Map();
