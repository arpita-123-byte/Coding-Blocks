const express = require("express");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");  //  Add this line

const app = express();
const PORT = 4444;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/calculate", (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);

  const sum = num1 + num2;
  const product = num1 * num2;
  const divide = num2 !== 0 ? (num1 / num2).toFixed(2) : "Cannot divide by 0";

 const resultTemplate = fs.readFileSync(path.join(__dirname, "public", "result.html"), "utf-8");

const finalPage = resultTemplate
  .replace("{{NUM1}}", num1)
  .replace("{{NUM2}}", num2)
  .replace("{{SUM}}", sum)
  .replace("{{PRODUCT}}", product)
  .replace("{{DIVIDE}}", divide);

res.send(finalPage);

});

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Server running at ${url}`);

  //  Auto-open browser
  const command = process.platform === "win32" ? `start ${url}` : `xdg-open ${url}`;
  exec(command);
});


