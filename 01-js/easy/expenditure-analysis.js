/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const cost = new Map();
  for (trnsc of transactions) {
    const category = trnsc.category;
    const currTotal = cost.has(category) ? cost.get(category) : 0;
    cost.set(category, currTotal + trnsc.price);
  }

  let totalPrice = [];
  cost.forEach((value, key) => {
    totalPrice.push({category: key, totalSpent: value});
  })

  return totalPrice;
}

module.exports = calculateTotalSpentByCategory;
