import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3008;

app.use(bodyParser.json());
app.use(cors())

// Read soap data from the JSON file
const soap = JSON.parse(fs.readFileSync("./soap.json", "utf8"));

// List all data
app.get("/", (req, res) => {
  res.json(soap);
});

// Get a specific data by ID
app.get("/:id", (req, res) => {
  const item = soap.find((item) => item.id === req.params.id);
  if (!item) {
    res.status(404).json({ message: "Item not found" });
  } else {
    res.json(item);
  }
});

// Update operation
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedFields = req.body; // Fields to be updated

  const index = soap.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Item not found" });
  } else {
    // Merge the existing item with the updated fields
    const updatedItem = { ...soap[index], ...updatedFields };
    soap[index] = updatedItem;

    fs.writeFileSync("soap.json", JSON.stringify(soap));
    res.json(updatedItem);
  }
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
