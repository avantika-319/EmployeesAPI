const express = require("express");
const cors = require("cors");
const app = express();
const { getEmployees, getEmployeesById } = require("./controllers/index");

app.use(cors());
app.use(express.json());

app.get("/employees", async (req, res) => {
  const employees = getEmployees();
  res.json(employees);
});

app.get("/employees/details/:id", async (req, res) => {
  let employee = getEmployeesById(parseInt(req.params.id));

  res.json({ employee });
});

module.exports = { app };
