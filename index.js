const ccxt = require("ccxt"); // Import ccxt module.
const readline = require("readline-sync");
require("dotenv").config();

const exchange = new ccxt.binance({
	apiKey: process.env.BINANCE_TESTNET_API_KEY,
	secret: process.env.BINANCE_TESTNET_API_SECRET,
	enableRateLimit: true,
	options: {
		defaultType: "spot",
		recvWindow: 10000,
		adjustForTimeDifference: true,
	},
});
exchange.setSandboxMode(true); // Enables testnet mode.

(async () => {
	const markets = await exchange.load_markets();
	let base_input = readline.question("Enter Base Currency: ").trim(); // Get base input value from user.
	let base_uppercase = base_input.toUpperCase();
	let symbol = `${base_uppercase}/USDT`;

	if (markets[symbol]) {
		try {
			let symbol_structure = exchange.markets[symbol]; // fixed property name from market to markets
			console.log(symbol_structure);
		} catch (error) {
			console.log("Failed to retrieve symbol structure:", error);
		}
	} else {
		console.log(`The symbol '${symbol}' is not within ${exchange.name}'s list of markets.`);
	}
})();
