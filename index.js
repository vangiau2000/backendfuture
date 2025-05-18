const express = require('express')
require('dotenv').config()



const app = express()
const port = 3000
const mongodb = require("./config/mongodb")
app.use(express.static(__dirname + '/public'));
const SetTupRouteClient = require("./routes/client/index.route")
const SetTupRouteAdmin = require("./routes/admin/index.route")
const { prefixAmin } = require('./config/system')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// alerrt
const flash = require('express-flash')
const session = require('express-session');
const cookieParser = require('cookie-parser')
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// end alert

SetTupRouteClient(app);
SetTupRouteAdmin(app);

// teamplate engine
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')
// teamplate engine

mongodb.connect()

// express locale chỉ sử dụng ở file pug, thôi còn js vân phải import
app.locals.prefixAmin = prefixAmin;




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
