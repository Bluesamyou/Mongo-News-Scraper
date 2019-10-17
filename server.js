const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

// Initialise app
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.static("public"));

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

mongoose.connect(MONGODB_URI);

app.listen(PORT, function () {
    console.log("Magic happens on port :  " + PORT);
});