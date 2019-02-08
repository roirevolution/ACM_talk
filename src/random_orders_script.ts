import * as request from "request";

function order(toppings: Array<string>) {
  console.log(`Ordering ${toppings}`);
  request.post(
    {
      url: "https://roi-pizza.herokuapp.com/save_order",
      body: post_body(toppings),
      json: true
    },
    function(err, res, body) {});
}

function post_body(toppings: Array<string>) {
  return Object.assign(to_hash(toppings), {
    name: "bob",
    address: "bob's house"
  });
}

function to_hash(toppingsList: Array<string>) {
  const result: any = {};
  for (const topping of toppingsList) {
    result[topping] = true;
  }
  return result;
}

function random_order() {
  order(random_toppings());
}

function random_toppings() {
  const result = [];
  const num_toppings = Math.random() * 5 + 1;
  for (let i = 0; i < num_toppings; i ++) {
    result.push(random_topping());
  }
  return result;
}

const toppings = [
  "Pepperoni",
  "Mushrooms",
  "Onions",
  "Sausage",
  "Bacon",
  "Extra Cheese",
  "Black Olives",
  "Green Peppers",
  "Pineapple",
 // "Spicy Mushrooms", Left out for demonstration purposes
  "Spinach"
];

function random_topping(): string {
  return toppings[Math.floor(Math.random() * toppings.length)];
}


// Start ordering every 10 seconds and repeat forever.
setInterval(random_order, 10000);