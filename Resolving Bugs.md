# Resolving Bugs

`master` intentionally has three bugs. These bugs are intended to be discovered during the demonstration portion.

Because live coding is a dangerous game and the demonstration is interactive, the bugs can be discovered in any order. To make it easier for the presenters, this document will include the three bugs, how to identify them, and how to resolve them.


## Bug List

1. [Only Three Toppings](#only-three-toppings)
1. [That's a Spicy Memory Leak](#thats-a-spicy-memory-leak)
1. [Missing Orders](#missing-orders)

## Only Three Toppings

### Identifying

TODO

### Resolving

TODO

## That's a Spicy Memory Leak

### Identifying

TODO

### Resolving

TODO

## Missing Orders

### Identifying

You will want to compare the metrics around Total Orders and Save Orders. We have some graphs that help make this more obvious by showing the difference between them.

These _should_ be the same - when you save an order the total number of orders should go up. However, there is a bug where the key used to track orders can easily have a collision. We are using the topping list as the order ID, so if two pizzas with the same toppings are ordered we will overwrite the previous order.

### Resolving

To fix this issue, you need to update the logic for generating the order ID.

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
