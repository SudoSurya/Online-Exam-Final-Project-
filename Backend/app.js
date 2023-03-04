// ! imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./Routes/UserRoutes");
const app = express();
// ! MiddleWare
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/user", UserRoutes);
// ! Server
const PORT = 8085;
app.listen(PORT, () => {
  console.log("Server UP and Running");
});
// ! DB Connection
mongoose.set("strictQuery", true);
// mongoose
//   .connect(
//     "mongodb+srv://admin:admin@cluster0.jhj7ej8.mongodb.net/?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//     }
//   )
//   .then(() => console.log("DB connected"))
//   .catch((error) => console.error(error));

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.jhj7ej8.mongodb.net/test", {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connected"))
  .catch((error) => console.error(error));
// ! Test Route
app.get("/", (req, res) => {
  res.send("EndPoints And Backend Working");
});
