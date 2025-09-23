const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Serve everything inside "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Fallback to index.html for any route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
