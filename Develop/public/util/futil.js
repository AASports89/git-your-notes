const fs = require("fs");
const util = require("util");

//PROMISE FS READFILE//
	const readFromFile = util.promisify(fs.readFile);
//WRITE JSON FILE --> DESTINATION//
	const writeToFile = (destination, content) =>
	fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
		err
			? console.error(err)
			: console.info(`\nData written to ${destination}`)
	);
//READ & APPEND//
	const readAppend = (content, file) => {
		fs.readFile(file, "UTF-8", (err, data) => {
		if (err) {
			console.error(err);
		} else {
			const parsedData = JSON.parse(data);
			parsedData.push(content);
			writeToFile(file, parsedData);
		}
		});
	};

	module.exports = {readFromFile, writeToFile, readAppend};