const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/build'));

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
