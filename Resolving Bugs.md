# Resolving Bugs

`master` intentionally has three bugs. These bugs are intended to be discovered during the demonstration portion.

Because live coding is a dangerous game and the demonstration is interactive, the bugs can be discovered in any order. To make it easier for the presenters, this document will include the three bugs, how to identify them, and how to resolve them.

## Prep

To deploy this fixes, you will need to make a commit for each fix to have something to push to Heroku. Consider branching off of master prior to the presentation and committing on that temporary branch.

## Bug List

1. [Only Three Toppings](#only-three-toppings)
1. [That's a Spicy Memory Leak](#thats-a-spicy-memory-leak)
1. [Missing Orders](#missing-orders)

## Only Three Toppings

### Identifying

The graph showing the pizza orders histogram should show the `max` does not go above `3`.

### Resolving

If you do a search for `3` you find we are doing a `slice` on the list of toppings. Removing that will give you all of the toppings.

#### Anecdote

Sometimes, when working with a large client, it can be easier when developing to only deal with a subset of the data. You could end up doing something like `slice`-ing a subset of their data to make things move faster.


#### Before

```typescript
// src/controllers/order.ts
function toppingsFrom(body: Object): Array<string> {
  const all_keys = Object.keys(body);
  const toppings = all_keys.filter(
    (t) => validTopping(t)
  ).slice(0, 3);
  return toppings.map((topping) => process_images_for(topping));
}
```
#### After

```typescript
// src/controllers/order.ts
function toppingsFrom(body: Object): Array<string> {
  const all_keys = Object.keys(body);
  const toppings = all_keys.filter(
    (t) => validTopping(t)
  );
  return toppings.map((topping) => process_images_for(topping));
}
```

## That's a Spicy Memory Leak

### Identifying

We should see memory increase over time. We would like to show that that happens when an order is placed with Spicy Mushrooms.

### Resolving

We are adding a huge string to an array whenever an order is placed with Spicy Mushrooms. We should remove that logic.

#### Before

```typescript
// src/controllers/order.ts

function process_images_for(topping: string): string {
  if (topping == "Spicy Mushrooms") {
    console.log("Someone ordered spicy mushrooms!");
    images.push(fs.readFileSync("src/public/images/explosive mushroom.svg", "utf8").repeat(1e6 * 20));
  }
  return topping;
}
```

#### After

```typescript
// src/controllers/order.ts

function process_images_for(topping: string): string {
  return topping;
}
```

## Missing Orders

### Identifying

You will want to compare the metrics around Total Orders and Save Orders. We have some graphs that help make this more obvious by showing the difference between them.

These _should_ be the same - when you save an order the total number of orders should go up. However, there is a bug where the key used to track orders can easily have a collision. We are using the topping list as the order ID, so if two pizzas with the same toppings are ordered we will overwrite the previous order.

### Resolving

To fix this issue, you need to update the logic for generating the order ID.

#### Anecdote

We have an application that has background worked. These workers pick up work from a queue. We had an issue where work was starting, but not finishing. Usually, when something fails we get an email, but we didn't for this. We only found out when a user said their jobs were running. If we had something like this that did some accounting of things going in the queue and things finishing, we would have been able to get an alert about this issue.

#### Before

```typescript
// src/controllers/order.ts

const orderId = toppings.sort().join(",");
```

#### After

```typescript
// src/controllers/order.ts

// In production, you would probably want to use something like  a UUID library
// However, this will generate a random 12 digit number, so it should do the trick for us
const orderId = Math.round(Math.random() * 1000000000000);
```
