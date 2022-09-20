//DEPENDENCIES//
	const express = require("express");
	const app = express();

	const PORT = process.env.PORT || 8080;

//MIDDLEWARE//
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static("public"));

//ROUTER//
	require("./routes/notes")(app);
	require("./routes/index")(app);

//LISTENER//
	app.listen(PORT, () => 
		console.log(`App listening at http://localhost:${PORT} 🚀`)
	);