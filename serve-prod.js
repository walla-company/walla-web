const express = require('express');
const path = require('path');
const app = express();
const index_path = path.join(__dirname, 'build/index.html');

app.use(express.static('build'));

app.all('*', (req, res) => {
    res.status(200).sendFile(index_path);
});

app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
    console.log('Server is running!');
});