import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const api = process.env.API_URL;

const app = express();

app.get(api + "/", (req, res) => {
  res.send("home page ");
});

const PORT = 3030;
app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`server ${api} run on ${PORT}`);
});
