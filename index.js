const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

const blog = require("./routes/blog");
// mount
app.use("/api/v1", blog);

const connectWithDB = require("./config/database");
connectWithDB();

// Start the server
app.listen(PORT, () => {
    console.log(`App is started at Port no ${PORT}`);
})

app.get("/", (request, response) => {
    response.send(`<h1>This is My HomePage</h1>`);
}) 