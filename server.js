const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/build'));

app.listen(port, () => console.log(`App listening to port ${port}`));
