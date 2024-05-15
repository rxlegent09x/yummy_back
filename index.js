 const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send({
    "status":"Please Get_Lost_From_Here !"
  });
});
app.use(express.static("public"));
  app.get("/admin",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/index.html"));

  });

const { socketon } = require("./help/socket-config.js");
socketon(server);

const { apion } = require("./help/api-config.js");
apion(app);

// const { send_Mail } = require("./help/gmail-config");











server.listen(3000, () => {
  console.log("Server Is Listening ...");
});
