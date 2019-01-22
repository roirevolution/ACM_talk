import * as request from "request";

function random_order() {
  const post_body = JSON.stringify ({
    url: "https://roi-pizza.herokuapp.com/",
    body: random_post_body()
  });
  request.post(post_body, function(err, res, body) {});
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
  "Spinach",
  "Spicy Mushrooms"
];

function random_topping(): string {
  return toppings[Math.floor(Math.random() * toppings.length)];
}


// Start ordering every second and repeat forever.
setInterval(random_order, 1000);