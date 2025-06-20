const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get the application version
app.get('/api/version', (req, res) => {
    fs.readFile(path.join(__dirname, 'package.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading version');
            return;
        }
        const { version } = JSON.parse(data);
        res.json({ version });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 