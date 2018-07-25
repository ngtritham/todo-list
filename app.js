const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res)=> {
    res.render('index');
});



app.listen(port, () => {
    console.log("Serving on port: " + port);
});