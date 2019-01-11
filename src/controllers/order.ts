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
  addToOrders(Object.keys(req.body));
  res.render("order_saved", {
    title: "Saved",
    text: "there"
  });
}

function addToOrders(toppings: Array<string>, name = "bob") {
  const orderId = toppings.sort().join(",");
  orders.set(orderId, name);
  console.log(orders);
}

const orders = new Map();
