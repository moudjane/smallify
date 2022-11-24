const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const mongoose = require("mongoose");
const randomstring = require("randomstring");
const linkdb = mongoose.model("links", {
    url: String,
    link_id: String,
    created_at: Date,
});
require("dotenv").config();

mongoose.connect(process.env.DB);

//on url post request

app.post("/create", cors(), function (req, res) {

    //generate random ID

    const randomid = randomstring.generate({
        length: 5,
        charset: "alphabetic",
        capitalization: "lowercase",
    });

    //test if string is null or no point is provided

    const regexpoints = new RegExp("\\.");
    const testregexpoints = regexpoints.test(req.body.url);

    if (req.body.url === "" || testregexpoints === false) {
        res.send("please specify a valide URL");
    }

    //test if string start with https or http

    let short_url = req.body.url;
    const regex = new RegExp("^(http|https)://", "i");
    const regex_url = regex.test(short_url);

    if (regex_url === false) {
        short_url = "https://" + short_url;
    }

    //test is link is too much long

    if (short_url.length >= 5000) {
        res.send("please specify a valide URL");
    }

    //save to DB

    const savelinktodb = new linkdb({
        url: short_url,
        link_id: randomid,
        created_at: Date.now(),
    });
    savelinktodb.save();
    res.send("http://localhost:8000/" + randomid);
});

//on url Redirect

app.get("/:short_url", (req, res) => {
    const short_url = req.params.short_url;
    const query = linkdb.findOne({ link_id: short_url });
    query.exec(function (err, link) { res.redirect(link.url) });
});

app.listen(8000, () => console.log(`server running on port : 8000`));