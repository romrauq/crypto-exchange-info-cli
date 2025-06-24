const { exchange } = require("./config/config");
const { getUSDTMarkets } = require("./functions/cliFunctions");
const { getSymbols } = require("./functions/cliFunctions");
const { getSymbolsVolumes, getHighVolumes } = require("./functions/getDataFunctions");

(async () => {
	let usdtMarkets = await getUSDTMarkets(exchange);
	let symbolsArray = await getSymbols(exchange, usdtMarkets);

	let symbolsData = await getSymbolsVolumes(exchange, symbolsArray);
	let highVolumes = getHighVolumes(symbolsData, 100000000);

	console.log(usdtMarkets.length);
	console.log(symbolsArray.length);
	console.log("Amount remaining: " + highVolumes.length);
	console.log(highVolumes);
})();
