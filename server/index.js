const express = require("express")
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const mongoose = require('mongoose');
const randomstring = require("randomstring");
const linkdb = mongoose.model('links', { url: String, link_id: String });
require('dotenv').config()

mongoose.connect(process.env.DB);

app.post('/create', cors(), function (req, res) {
    const randomid = randomstring.generate({ length: 5, charset: 'alphabetic', capitalization: 'lowercase' });
    const short_url = req.body.url;
    const savelinktodb = new linkdb({ url: short_url, link_id: randomid });
    savelinktodb.save()
    console.log("new url created with id : " + randomid + " linked to https://" + short_url);
    res.send("http://localhost:8000/" + randomid);
});

app.get('/:short_url', (req, res) => {
    const short_url = req.params.short_url;
    const query = linkdb.findOne({ 'link_id': short_url });
    query.exec(function (err, link) {
        console.log(link)
        if (link !== null) {
            res.redirect(link.url);
        }
    });
});

app.listen(8000, () => console.log(`server running on port : 8000`))