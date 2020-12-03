const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening to port: ${port}`));
