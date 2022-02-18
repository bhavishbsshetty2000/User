const express = require("express");
const app = express();
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const dbUrl =
  "mongodb+srv://Bhavish:bhavish@cluster0.i0mpb.mongodb.net/<dbName>?retryWrites=true&w=majority";

app.use(express.json());

const cors = require("cors");
const res = require("express/lib/response");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome");
});

const students = [];
const teachers = [];

app.get("/student", (req, res) => {
  res.status(200).json(students);
});

app.post("/user-create", async (req, res) => {
  const clients = await mongoClient.connect(dbUrl);
  try {
    const db = clients.db("newuser");
    const user = await db.collection("users").insertOne(req.body);
    // console.log(req.body);
    res.json({
      message: "record created",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error",
    });
  } finally {
    clients.close();
  }
});

app.get("/get-users", async (req, res) => {
  const client = await mongoClient.connect(dbUrl);
  try {
    const db = client.db("newuser");
    const user = await db.collection("users").find().toArray();

    res.json(user);
    console.log(user);
  } catch (error) {
    res.json({
      message: "Something went wrong",
    });
  } finally {
    client.close();
  }
});

app.get("/single-user/:id", async (req, res) => {
  const client = await mongoClient.connect(dbUrl);
  try {
    const db = client.db("newuser");
    const objId = mongodb.ObjectId(req.params.id);
    const user = await db.collection("users").findOne({ _id: objId });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  } finally {
    client.close();
  }
});

app.put("/update-users/:id", async (req, res) => {
  const client = await mongoClient.connect(dbUrl);
  try {
    const db = client.db("newuser");
    const objId = mongodb.ObjectId(req.params.id);
    const user = await db.collection("users").findOne({ _id: objId });
    if (!user) {
      res.json({
        message: "User not found",
      });
    } else {
      const updateUser = await db
        .collection("users")
        .findOneAndUpdate({ _id: objId }, { $set: { name: req.body.name } });
      res.json({ message: "User updated" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  } finally {
    client.close();
  }
});

app.delete("/delete-users/:id", async (req, res) => {
  const client = await mongoClient.connect(dbUrl);
  try {
    const db = client.db("newuser");
    const objId = mongodb.ObjectId(req.params.id);
    const user = await db.collection("users").findOne({ _id: objId });
    if (!user) {
      res.json({
        message: "User not found",
      });
    } else {
      const deleteUser = await db
        .collection("users")
        .findOneAndDelete({ _id: objId });
      res.json({
        message: "User has been deteled",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      messgae: "Something went wrong",
    });
  } finally {
    client.close();
  }
});

app.delete("/delete-all", async (req, res) => {
  const client = await mongoClient.connect(dbUrl);
  try {
    const db = client.db("newuser");
    const users = await db.collection("users").deleteMany({});
    res.json({
      message: "all user deleted",
    });
  } catch (error) {
    console.log(error);
    res.json({
      messgae: "Something went wrong",
    });
  } finally {
    client.close();
  }
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Server Started in port ${port}`);
});
