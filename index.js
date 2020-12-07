const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

<<<<<<< HEAD
=======
const registerRouter = require("./src/routes/register");
>>>>>>> 2.Register
const userRoutes = require("./src/routes/user");
const loginRoutes = require("./src/routes/login");

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

<<<<<<< HEAD
=======
app.use("/api/v1/", registerRouter);
>>>>>>> 2.Register
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", loginRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening to port: ${port}`));
