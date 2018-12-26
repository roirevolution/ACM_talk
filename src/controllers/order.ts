import { Request, Response } from "express";

/**
 * GET /order
 * start a new pizza order
 */
export let newOrder = (req: Request, res: Response) => {
  res.render("new_order", {
    title: "New Order"
  });
};
