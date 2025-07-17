
const express = require('express');
const cors = require('cors');
const { Log } = require('./utils/logger'); 

const app = express();
const PORT = 5000; 

app.use(cors());
app.use(express.json()); 


app.use((req, res, next) => {
    Log("backend", "info", "handler", `Incoming request: ${req.method} ${req.url}`);
    next(); 
});


app.get('/api/shortened-urls', (req, res) => {
    Log("backend", "debug", "controller", "Responding to /api/shortened-urls.");
    
    res.json([
        { id: 1, originalUrl: "https://google.com", shortCode: "abc12", expiry: "2025-07-17T12:00:00Z", clicks: 5 },
        { id: 2, originalUrl: "https://example.com", shortCode: "xyz34", expiry: "2025-07-17T12:15:00Z", clicks: 1 }
    ]);
});



app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
    Log("backend", "info", "server", `Backend API server started on port ${PORT}`); 
});