const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/submitConcern", (req, res) => {
  const name = req.body.name;
  const concern = req.body.concern;

  mongoose
    .connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Failed to connect to MongoDB:", error));

  const concernSchema = new mongoose.Schema({
    name: String,
    concern: String,
  });

  const Concern = mongoose.model("Concern", concernSchema);

  app.post("/submitConcern", (req, res) => {
    const name = req.body.name;
    const concern = req.body.concern;

    const newConcern = new Concern({ name, concern });
    newConcern
      .save()
      .then(() => {
        const reply = `Thank you, ${name}! We have received your concern. We will get back to you regarding your mental health issue.`;

        res.json({ reply });
      })
      .catch((error) => {
        console.error("Failed to save concern:", error);
        res.status(500).json({ error: "Failed to save concern" });
      });
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
