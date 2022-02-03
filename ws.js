process.title = "JDO_OldGen - WS";

// ---------- Modules ----------

const express = require("express"),
      app = express()

const Logger = require("./Logger"),
      Config = require("./Config");

// ----------------------------

app.set('etag', false);
app.disable('x-powered-by');

app.use("/ws1", require("./WS1/ws1"))
app.use("/ws2", require("./WS2/ws2"))

app.use((req, res) => {
	res.status(404).send();
});

app.use((error, req, res) => {
	const status = error.status || 500;

	res.status(status).json({
		app: 'api',
		status,
		error: error.message
	});
});

app.listen(process.env.PORT, () => {
	Logger.success(`Main WS started on port ${process.env.PORT}`);
});