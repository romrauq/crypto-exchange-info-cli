const ccxt = require("ccxt"); // Import ccxt module.
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

module.exports = { exchange };
