import fruits from "../../src/data/fruits";

export async function createFruit() {
  const newFruit = { id: 1, name: "abacate", price: 3900 };
  fruits.push(newFruit);
  return fruits;
}

export async function cleanDb() {
  fruits.length = 0;
}
