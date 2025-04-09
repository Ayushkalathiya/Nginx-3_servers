const express = require('express');
const app = express();

// Catch-all route
app.use((req, res) => {
    res.send('Response from Server 3');
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server 3 running on http://localhost:${PORT}`);
});
