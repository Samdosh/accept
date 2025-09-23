const express = require('express');
const path = require('path');
const app = express();

// Serve static files from frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Fallback to index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
