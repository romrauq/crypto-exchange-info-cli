// Import helper functions:
const { apiCooldown } = require("./basicFunctions");

// This function gets the past (period specified) OHLCV candlestick price data of a specified symbol from a specified date:
const getPastOHLCV = (_fs, _exchange, _symbol, _candle_period, _startDate, _limit) => {
	// Fetch the OHLCV (open, high, low, close, volume) data for the specified symbol:
	_exchange
		.fetchOHLCV(_symbol, _candle_period, _startDate.getTime(), _limit)
		.then((data) => {
			// Write the fetched data to a JSON file
			_fs.writeFile("price_data.json", JSON.stringify(data), (err) => {
				if (err) throw err;
				console.log("Price data saved to price_data.json");
			});
		})
		.catch((err) => {
			console.log("Error fetching data:", err);
		});
};

// This function returns an array of objects with property values; symbol, base_volume & quote_volume.
// base_volume & quote_volume values are the 24hr traded volumes of each.
// The data returned is fetched respectively from the array of symbols passed to the function.
const getSymbolsVolumes = async (_exchange, _symbols, _delay = 3) => {
	// Fetch symbols' tickers:
	console.log(`Fetching all ${_symbols.length} symbols' volume information...`);
	const response = await _exchange.fetchTickers(_symbols); // API call.

	// Save response object in an array for iteration:
	response_arr = []; // Initialize empty array.
	response_arr.push(response); // Push response object into array.
	// console.log(response_arr[0]["BTC/USDT"]); // Test Log.

	await apiCooldown(_delay); // API cooldown.

	let volume_data = []; // Define empty array

	for (let i = 0; i < _symbols.length - 1; i++) {
		// console.log(response_arr[0][_symbols[i]].symbol); // Test log.
		// NB: symbol = BASE/QUOTE
		let b_volume = parseInt(response_arr[0][_symbols[i]].baseVolume);
		let q_volume = parseInt(response_arr[0][_symbols[i]].quoteVolume);
		// Push each symbol's name and volume (base & qoute) into volume_data array:
		volume_data.push({
			symbol: response[_symbols[i]].symbol,
			base_volume: b_volume, // 24hr traded volume of base on exchange.
			quote_volume: q_volume, // 24hr traded volume of quote on exchange.
		});
	}

	return volume_data;
};

// Function that takes an array of objects {symbol: val, b_volume: val, q_volume: val} and filters out low volumes according to the volume limit parameter argument passed to the function.
const filterLowVolumes = (_data, _vol_limit) => {
	const high_volumes = _data.filter((symbol) => symbol.quote_volume > _vol_limit);
	// console.log(`Above ${_vol_limit} Volumes:`, high_volumes); // Test log.

	return high_volumes;
};

module.exports = { getPastOHLCV, getSymbolsVolumes, filterLowVolumes };
