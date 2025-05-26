const readline = require("readline-sync");

// Function to get base value from user an return symbol structure if contained within exchange's markets:
const checkBase = async (_exchange) => {
	const markets = await _exchange.load_markets();
	let base_input = readline.question("Enter Base Currency: ").trim(); // Get base input value from user.
	let base_uppercase = base_input.toUpperCase();
	let symbol = `${base_uppercase}/USDT`;

	if (markets[symbol]) {
		try {
			let symbol_structure = _exchange.markets[symbol];
			console.log(symbol_structure);
		} catch (error) {
			console.log("Failed to retrieve symbol structure:", error);
		}
	} else {
		console.log(`The symbol '${symbol}' is not within ${_exchange.name}'s list of markets.`);
	}
};

module.exports = { checkBase };
