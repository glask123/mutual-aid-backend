require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const users = require("./routes/auth_router");
const requests = require("./routes/req_router");
const passport = require("passport");
const LocalStrategy = require("passport-local");
//const passportLocalMongoose = require("passport-local-mongoose");

const session = require("express-session");

//const initializePassport = require("./config/passport-config");
const User = require("./models/User");

const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Connected to MongoDB");

      const app = express();
      //app.use(cors());
      app.use(express.json());
      //app.use(express.urlencoded({ extended: false }));

      app.use("/api", routes);
      app.use("/api/account", users);
      app.use("/api/requests", requests);

      /*
      initializePassport(passport, async (email) => {
        const user = await User.findOne({ email: email });
        return user;
      });
      */

      /*
      app.use(
        session({
          secret: process.env.SECRET,
          resave: false,
          saveUninitialized: false,
        })
      );
*/

      //app.use(passport.initialize());
      //app.use(passport.session());

      var database = mongoose.connection;

      database.on("error", (err) => {
        console.log(err);
      });

      app.listen(port, () => console.log(`Listening on port ${port}`));
    },
    (err) => {
      console.log(err);
    }
  );
