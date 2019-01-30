import * as request from "request";

function random_order() {
  request.post(
    {
      url: "https://roi-pizza.herokuapp.com/save_order",
      body: random_post_body(),
      json: true
    },
    function(err, res, body) {});
}

function random_post_body() {
  return Object.assign(random_toppings(), {
    name: "bob",
    address: "bob's house"
  });
}

function random_toppings() {
  const result: any = {};
  const num_toppings = Math.random() * 5 + 1;
  for (let i = 0; i < num_toppings; i ++) {
    const topping = random_topping();
    result[topping] = true;
  }
  console.log(result);
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