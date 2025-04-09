const express = require('express');
const app = express();

// Catch-all route
app.use((req, res) => {
    res.send('Response from Server 1');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server 1 running on http://localhost:${PORT}`);
});
