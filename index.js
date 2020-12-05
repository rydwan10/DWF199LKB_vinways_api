const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

const userRoutes = require("./src/routes/user");
const transactionRoutes = require("./src/routes/transaction");

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use("/api/v1/", userRoutes);
app.use("/api/v1/", transactionRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening to port: ${port}`));
