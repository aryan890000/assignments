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
  let result = [];
  if (transactions.length != 0) {
    if (transactions.length == 1) {
      result.push({category: transactions[0]["category"], totalSpent: transactions[0]["price"]});
      return result;
    } else {
      const result = Object.values(
        transactions.reduce((acc, transaction) => {
          const { category, price } = transaction;
          acc[category] = acc[category] || { category, totalSpent: 0 };
          acc[category].totalSpent += price;
          return acc;
        }, {})
      );
      return result;
    }
  } else {
    return [];
  }
}

module.exports = calculateTotalSpentByCategory;
