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
  console.log(`Parameters: #{req.params}`);
  res.render("order_saved", {
    title: "Saved",
    text: "there"
  });
}
