const express = require('express');
const cors = require("cors");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'static')));
const allowedOrigin = 'https://polite-island-01e695b10.4.azurestaticapps.net'; // allows only the dice roller static website to make requests
app.use(cors({
  origin: allowedOrigin
}));

app.get('/roll', (request, response) => {
    console.log('Calling "/roll" on the Node.js server.');
    response.json({ roll: Math.floor(Math.random() * 6) + 1 });
});

app.use((request, response) => {
    response.status(404);
    response.sendFile(path.join(__dirname, 'static', '404.html'));
});

app.listen(port, () => console.log(
    `Express started at "http://localhost:${port}"\n` +
    `press Ctrl-C to terminate.`
));