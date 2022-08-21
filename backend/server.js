const express = require("express");
const cors = require("cors");
require("./db/config");
const Task = require("./db/Collection");
const app = express();
const dotenv = require("dotenv").config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000

app.post("/add-task", async (req, resp) => {
  let task = new Task(req.body);
  let result = await task.save();
  resp.send(result);
});

app.get("/tasks", async (req, resp) => {
  const tasks = await Task.find();
  if (tasks.length > 0) {
    resp.send(tasks);
  } else {
    resp.send({ result: "No Task found" });
  }
});

app.delete("/task/:id", async (req, resp) => {
  let result = await Task.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/task/:id", async (req, resp) => {
  let result = await Task.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found." });
  }
});

app.put("/task/:id", async (req, resp) => {
  let result = await Task.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get("/search/:key", async (req, resp) => {
  let result = await Task.find({
    $or: [
      {
        title: { $regex: req.params.key },
      },
      {
        description: { $regex: req.params.key },
      },
      {
        starttime: { $regex: req.params.key },
      },
      {
        endtime: { $regex: req.params.key },
      },
      {
        priority: { $regex: req.params.key },
      },
      {
        status: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});


if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.send("Api running");
  });
}


app.listen(PORT);