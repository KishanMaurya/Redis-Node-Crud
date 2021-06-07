const express = require("express");
const app = express();
const redis = require("redis");
const indexRoutes = require("./routes/indexRouter");
let client = redis.createClient();


client.on('connect',function(){
console.log('Redis connected successfully!!!!!');
});


app.use(express.json());
app.use("/home", indexRoutes);

app.use(function (req, res, next) {
  res.status(404);
  res.send("404: File Not Found");
  return;
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000...");
});