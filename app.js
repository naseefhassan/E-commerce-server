const express = require("express");
const app = express();
const port = 4546;
const bodyParser = require("body-parser");
require("dotenv").config();
require('./Confiq/config')
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const CommonRouter= require('./Router/CommonRouter')

app.use('/',CommonRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
