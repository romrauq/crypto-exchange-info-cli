const { exchange } = require("./config/config");
const { getUSDTMarkets } = require("./functions/cliFunctions");
const { getSymbols } = require("./functions/cliFunctions");

(async () => {
	let usdtMarkets = await getUSDTMarkets(exchange);
	let symbolsArray = await getSymbols(exchange, usdtMarkets);
	console.log(usdtMarkets.length);
	console.log(symbolsArray.length);
})();
