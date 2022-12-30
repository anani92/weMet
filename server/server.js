const express = require("express");
const cors = require("cors");
const app = express();
const cookieparser = require("cookie-parser");
require("./config/mongoose.config");
require("dotenv").config();
app.use(cookieparser());
// replace app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/app.routs")(app);
app.listen(8000, () => {
  console.log("Listening at Port 8000");
});
