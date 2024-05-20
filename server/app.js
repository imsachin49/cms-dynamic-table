const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = require('./routes/apiRoutes');

app.use(cors('*'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 5001;

app.use('/entity', routes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});