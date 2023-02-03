const express = require("express");
const app = express();
require('dotenv').config()
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const uploadCatalog= require('./Routes/UploadRoute');
const userCatalog = require('./Routes/UserRoute');
const corsOptions = {
  origin:"http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyparser.json());
mongoose
  .connect(process.env.REACT_APP_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch(console.error);

app.get("/", async(req, res) => {
  res.json("hello world");
});

app.use('/User' , userCatalog);
app.use('/Upload' , uploadCatalog);




app.listen(process.env.REACT_APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.REACT_APP_PORT}`);
});
