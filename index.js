const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Routes
// app.use('/api/auth', require('./routes/api/auth'))
app.use("/api/users", require("./routes/api/users"));
app.use("/", require("./routes/api/products"));
app.use("/api/auth", require("./routes/api/auth"));
