// Function that returns the current time in the format [hh:mm:ss am/pm]
const getTime = () => {
	let hour = new Date().getUTCHours();
	let min = new Date().getUTCMinutes();
	let sec = new Date().getUTCSeconds();

	let ampm = hour >= 12 ? "pm" : "am";
	hour = hour > 12 ? hour - 12 : hour;

	hour = hour < 10 ? "0" + hour : hour;
	min = min < 10 ? "0" + min : min;
	sec = sec < 10 ? "0" + sec : sec;

	return `${hour}:${min}:${sec}${ampm}`;
};

// Function that takes UNIX format & return date in dd-mm-yyyy format.
const unixToDate = (_date) => {
	const dd = _date.getUTCDate();
	const mm = _date.getMonth() + 1;
	const yyyy = _date.getFullYear();

	return `${dd}-${mm}-${yyyy}`;
};

// Function that returns the current Profit and Loss percentage value.
const currentPNL = (_entry_price, _last_price, _decimals) => {
	let difference = _last_price - _entry_price;
	let pnl = (difference / _entry_price) * 100;
	return pnl.toFixed(_decimals);
};

// Function that delays the program flow at where it is called (to primarily prevent overclocking API calls).
const delayProgram = (_seconds) => {
	console.log(`API cooldown for (${_seconds} seconds)`);
	// Convert passed (seconds) argument into milliseconds for setTimeout() use:
	return new Promise((resolve) => setTimeout(resolve, _seconds * 1000));

	// Remember, append "await" before function call. Example:
	// await delayProgram(5)
};

// Function that writes fetched JSON data to a file within the same directory:
const writeJSONResponse = (_fs, _response, _filename = "json-file") => {
	_fs.writeFile(`${_filename}.json`, JSON.stringify(_response), function (err) {
		if (err) throw err;
		console.log("Response data successfully written to json-file.json");
	});
};

module.exports = {
	getTime,
	unixToDate,
	currentPNL,
	delayProgram,
	writeJSONResponse,
};
