const express = require("express");
const axios = require('axios')
const app = express();
app.use(express.static('/views'));
app.set('view engine', 'ejs');
app.use('/styles', express.static(__dirname + '/views/styles'));

app.get('/', async (req, res) => {
    var main;
    var json;
    try { 
        json = await axios.get('http://okayu.okawaffles.com/status'); 
        main = JSON.parse(JSON.stringify(json.data));
    } catch (err) {
        main = {status:"502"};
    }

    try {
        json = await axios.get('http://okayu.okawaffles.com/content/okawaffles/cstat.json');
    } catch (err) {
        json = {data:{status:"502"}};
    }

    mainstatus = main.status;
    contstatus = json.data.status;

    res.render('index.ejs', {"status_main":main.status,"status_content":json.data.status});
});

app.listen(3000, () => {
    console.log('listening...')
});