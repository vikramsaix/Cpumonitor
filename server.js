const express = require('express');
const osUtils = require('os-utils');
const path = require('path'); // Add this line to use the path module
const app = express();
const port = 3000;

// Middleware to allow cross-origin requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve index.html at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to get system metrics
app.get('/metrics', (req, res) => {
    osUtils.cpuUsage((cpuPercentage) => {
        res.json({
            cpuUsage: cpuPercentage,
            freeMemory: osUtils.freememPercentage(),
            totalMemory: osUtils.totalmem(),
            freeMemoryGB: osUtils.freemem(),
            platform: osUtils.platform(),
            uptime: osUtils.sysUptime()
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});