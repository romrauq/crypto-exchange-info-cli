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

// User enters a quote id & an array containing objects of symbols ending with the specified quote is returned:
let getUSDTMarkets = async (_exchange) => {
	await _exchange.loadMarkets(); // Loads available markets data of the exchange class.
	let markets = await _exchange.fetchMarkets();

	let quote_input = readline.question("Enter quote currency: ").trim(); // Get base input value from user.
	let quote_uppercase = quote_input.toUpperCase();
	let endQoute = `/${quote_uppercase}`;

	let target_symbols = markets.filter((item) => item.symbol.endsWith(endQoute));
	// console.log(target_symbols); // Test log for reviewing returned data.

	if (target_symbols.length !== 0) {
		let count = 1;

		// Console log for test purposes:
		// Object.keys(target_symbols).forEach((key) => {
		// 	console.log(count, target_symbols[key].symbol);
		// 	count++;
		// });

		return target_symbols; // Return array [key:{}, key:{}, key:{} ...].
	} else {
		console.log(`There are no symbols with the end quote "${endQoute}"`);
	}

	console.log("Total Number of Symbols:", target_symbols.length);
};

// Returns an array of strings of symbols obtained from a passed markets array data:
const getSymbols = async (_exchange, _markets_array) => {
	try {
		if (_markets_array.length !== 0) {
			let symbolsArray = [];
			_markets_array.forEach((element) => {
				symbolsArray.push(element.symbol);
			});
			// console.log(symbolsArray); // Test log for reviewing returned data.
			return symbolsArray; //
		}
	} catch (error) {
		console.log(error);
	}
};

const fetchTickers = async (_exchange, _symbols_array) => {
	try {
		let tickersArray = await _exchange.fetchTickers(_symbols_array);
		console.log(tickersArray); // test log for reviewing returned data.
		return tickersArray;

		// return exchangeTickers;
	} catch (error) {
		console.log(error);
	}
};

const getTopLiquidity = (_markets_array) => {
	if (_markets_array.length !== 0) {
		try {
			_markets_array.sort((a, b) => b.info.quoteVolume - a.info.quoteVolume); // sort by liquidity (quoteVolume)
			let count = 1;

			_markets_array.slice(0, 10).forEach((symbol) => {
				// Display top 10 symbols
				console.log(count, symbol.symbol); // Test log for reviewing returned data.
				count++;
			});
		} catch (error) {
			console.log(error);
		}
	} else {
		console.log(`There are no symbols with the end quote "${endQoute}"`);
	}
	console.log("Total Number of Symbols:", _markets_array.length);
};

module.exports = {
	checkBase,
	getUSDTMarkets,
	getSymbols,
	fetchTickers,
	getTopLiquidity,
};
