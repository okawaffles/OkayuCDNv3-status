const express = require("express");
const axios = require('axios')
const app = express();
app.use(express.static('/views'));
app.set('view engine', 'ejs');
app.use('/styles', express.static(__dirname + '/views/styles'));

app.get('/', async (req, res) => {
    const json = await axios.get('http://127.0.0.1:2773/status');
    const data = JSON.parse(JSON.stringify(json.data));
    res.render('index.ejs', {"status":data.status});
});

app.listen(3000, () => {
    console.log('listening...')
});