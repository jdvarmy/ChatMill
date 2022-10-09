import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const port = 3000;

app.engine('handlebars', engine({ layoutsDir: 'src/layout', defaultLayout: 'layout', extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use('/', function (request, response) {
  response.render('home.hbs');
});

app.listen(port, () => console.log(`App listening to port ${port}`));
