const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send({'message': 'Hello World'});
});

require("./routes/search.routes")(app);
require("./routes/popular.routes")(app);
require("./routes/order.routes")(app);
require("./routes/customer.routes")(app);
require("./routes/register.routes")(app);
require("./routes/login.routes")(app);
require("./routes/name.routes")(app);

app.listen(3002, () => {
    console.log("Server is running on port 3002");
});

