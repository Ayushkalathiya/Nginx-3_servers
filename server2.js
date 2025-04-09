const express = require('express');
const app = express();

// Catch-all route
app.use((req, res) => {
    res.send('Response from Server 2');
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server 2 running on http://localhost:${PORT}`);
});
