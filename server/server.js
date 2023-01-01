const express = require("express");
const cors = require("cors");
const app = express();

const cookieparser = require("cookie-parser");
require("./config/mongoose.config");
require("dotenv").config();
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors({ credentials: true }));
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/app.routs")(app);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening at Port ${PORT}`);
});
