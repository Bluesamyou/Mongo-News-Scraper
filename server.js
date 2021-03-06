const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require("path");

// Initialise app
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.listen(PORT, function () {
    console.log("Magic happens on port :  " + PORT);
});