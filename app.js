const express = require("express")
require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/handlers");

const app = express()

const { PORT } = require("./config/envconfig.js");

//const PORT = process.env.PORT || 3000;

require("./operations/routes")(app);
require("./operations/db")(app);





 app.use(notFound);
 app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Resida app is listening on :" + PORT);
});
