//RANDOM # FOR NEW NOTES//
	module.exports = () =>
		Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);