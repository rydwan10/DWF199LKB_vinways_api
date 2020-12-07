const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

<<<<<<< HEAD
<<<<<<< HEAD
=======
const registerRouter = require("./src/routes/register");
>>>>>>> 2.Register
const userRoutes = require("./src/routes/user");
<<<<<<< HEAD
const loginRoutes = require("./src/routes/login");
=======
const artistRoutes = require("./src/routes/artist");
const musicRoutes = require("./src/routes/music");
>>>>>>> 4.Music
=======
const transactionRoutes = require("./src/routes/transaction");
>>>>>>> 6.Transaction

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

<<<<<<< HEAD
<<<<<<< HEAD
=======
app.use("/api/v1/", registerRouter);
>>>>>>> 2.Register
app.use("/api/v1/", userRoutes);
<<<<<<< HEAD
app.use("/api/v1/", loginRoutes);
=======
app.use("/api/v1", artistRoutes);
app.use("/api/v1", musicRoutes);
>>>>>>> 4.Music
=======
app.use("/api/v1/", transactionRoutes);
>>>>>>> 6.Transaction

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening to port: ${port}`));
