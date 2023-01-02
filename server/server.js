const express = require("express");
const cors = require("cors");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./passport");
// const cookieparser = require("cookie-parser");
const oauth2 = require("./routes/oauth2");
require("./config/mongoose.config");
require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
// app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["mob"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./routes/app.routs")(app);
app.use("/auth", oauth2);
require("./routes/posts.routs")(app);
require("./routes/group.routs")(app);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening at Port ${PORT}`);
});
