const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");
const cors = require("cors");
const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// OR enable specific origins
// const corsOptions = {
//   origin: 'http://your-react-native-app.com',
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// Enable all CORS requests for development purposes
app.use(cors());

app.get("/testAPI", (request, response) => {
  response.json({ info: "Node.js Express, and Postgress API" });
});
app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
